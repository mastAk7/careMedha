import { prisma } from '../db/client.js';
import { haversineKm } from '../utils/geo.js';

export async function listPharmacies(req, res) {
  const { q, lat, lng } = req.query;
  const items = await prisma.pharmacy.findMany({
    where: { AND: [
      { isActive: true },
      q ? { name: { contains: String(q), mode:'insensitive' } } : {}
    ] }
  });

  let result = items;
  if (lat && lng) {
    result = items.map(p => ({
      ...p,
      distanceKm: (p.lat&&p.lng) ? haversineKm(+lat, +lng, p.lat, p.lng) : null
    })).sort((a,b)=> (a.distanceKm??1e9) - (b.distanceKm??1e9));
  }
  res.json(result);
}

export async function getPharmacy(req, res) {
  const ph = await prisma.pharmacy.findUnique({ where: { id: req.params.id } });
  if (!ph) return res.status(404).json({ error:'Not found' });
  res.json(ph);
}

export async function pharmacyInventory(req, res) {
  const { q } = req.query;
  const inv = await prisma.pharmacyInventory.findMany({
    where: {
      pharmacyId: req.params.id,
      medicine: q ? { name: { contains: String(q), mode:'insensitive' } } : undefined
    },
    include: { medicine: true }
  });
  res.json(inv);
}

export async function createPharmacy(req, res) {
  const ph = await prisma.pharmacy.create({ data: req.body });
  res.status(201).json(ph);
}
