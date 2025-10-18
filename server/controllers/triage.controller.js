import axios from "axios";

export async function triage(req, res) {
  const { text } = req.body;

  try {
    // Try hitting the AI model API first
    const response = await axios.post("http://localhost:5000/api/symptom-check", { text });
    
    // If model responds, forward its result
    return res.json(response.data);

  } catch (error) {
    console.error("Model not available, falling back to manual triage:", error.message);

    // Fallback to your existing manual triage
    const s = (text || "").toLowerCase();
    let risk = "mild";
    let nextSteps = ["Hydration", "Book a doctor if persists"];

    if (s.includes("chest pain") || s.includes("bleeding") || s.includes("unconscious")) {
      risk = "emergency";
      nextSteps = ["Call ambulance", "Nearest hospital"];
    } else if (s.includes("high fever") || s.includes("breathless")) {
      risk = "serious";
      nextSteps = ["Consult general physician today"];
    }

    return res.json({
      riskLevel: risk,
      suggestedSpecialization: risk === "mild" ? ["General Physician"] : ["General Physician"],
      nextSteps
    });
  }
}
