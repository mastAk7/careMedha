import { prisma } from '../db/client.js';

async function ensurePharmacyAdmin(userId, pharmacyId) {
  const adm = await prisma.pharmacyAdmin.findFirst({ where: { userId, pharmacyId } });
  return !!adm;
}

export async function upsertInventory(req, res) {
  const { pharmacyId } = req.params;
  if (!(await ensurePharmacyAdmin(req.user.id, pharmacyId))) return res.status(403).json({ error:'Forbidden' });

  const items = Array.isArray(req.body) ? req.body : [req.body];
  const ops = [];
  for (const it of items) {
    let medicineId = it.medicineId;
    if (!medicineId && it.name) {
      const med = await prisma.medicine.upsert({
        where: { name: it.name },
        update: {},
        create: { name: it.name, form: it.form ?? null, strength: it.strength ?? null, tags: it.tags ?? [] }
      });
      medicineId = med.id;
    }
    ops.push(prisma.pharmacyInventory.upsert({
      where: { pharmacyId_medicineId: { pharmacyId, medicineId } },
      create: { pharmacyId, medicineId, stockQty: it.stockQty ?? 0, price: it.price ?? null },
      update: { stockQty: it.stockQty ?? undefined, price: it.price ?? undefined }
    }));
  }
  const result = await prisma.$transaction(ops);
  res.status(201).json(result);
}

export async function updateInventoryItem(req, res) {
  // only for own pharmacy
  const item = await prisma.pharmacyInventory.findUnique({ where: { id: req.params.inventoryId } });
  if (!item) return res.status(404).json({ error:'Not found' });
  if (!(await ensurePharmacyAdmin(req.user.id, item.pharmacyId))) return res.status(403).json({ error:'Forbidden' });

  const updated = await prisma.pharmacyInventory.update({ where: { id: item.id }, data: req.body });
  res.json(updated);
}
