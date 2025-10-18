from flask_cors import CORS
import os
import json
import logging
from flask import Flask, request, jsonify, send_from_directory
import google.generativeai as genai
from dotenv import load_dotenv

# --- LOGGING CONFIGURATION ---
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)

# --- INITIAL SETUP ---

# Load environment variables from the .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__, static_folder=".", static_url_path="")
CORS(app, resources={r"/api/*": {"origins": "*"}})

# --- MODEL AND PROMPT CONFIGURATION ---

gemini_api_key = os.getenv("GEMINI_API_KEY")
if not gemini_api_key:
    logging.error("GEMINI_API_KEY not found in environment variables.")
    model = None
else:
    try:
        genai.configure(api_key=gemini_api_key)
        model = genai.GenerativeModel(
            "gemini-2.5-flash",
            generation_config={"response_mime_type": "application/json"},
        )
        logging.info("Gemini client initialized successfully.")
    except Exception as e:
        logging.error(f"Error initializing Gemini client: {e}")
        model = None

# --- MODEL AND PROMPT CONFIGURATION ---

# ... (previous code remains the same) ...

PROMPT_TEMPLATE = """
# Persona & Goal
You are "CareMedha," a specialized AI Medical Triage Assistant for a rural healthcare app in Punjab, India. Your primary function is to analyze user-reported symptoms and determine the urgency of medical attention required. You are NOT a diagnostic tool. Your goal is to triage, not to diagnose. Your responses must be safe, cautious, and clear.

# Core Instructions
1.  Analyze the user's symptoms provided in the {user_symptoms} placeholder.
2.  Classify the urgency into one of three triage levels based on the detailed guidelines below.
3.  Generate a brief, neutral summary of the symptoms in English.
4.  Provide a clear, simple, and actionable recommendation in Punjabi (Gurmukhi script).
5.  Respond ONLY with a single, raw, valid JSON object. Do not include any surrounding text, explanations, or markdown formatting like ```json.

---

# Triage Level Definitions & Guidelines

### 1. "emergency"
- *Definition:* Life-threatening conditions requiring IMMEDIATE medical attention at a hospital.
- *Triggers:* Always use this level if the user mentions any of the following:
    - Severe chest pain or pressure
    - Difficulty breathing, shortness of breath
    - Uncontrolled bleeding
    - Sudden confusion, dizziness, or loss of consciousness
    - Signs of stroke (e.g., face drooping, arm weakness, slurred speech)
    - Severe headache, especially if sudden
    - High fever over 104°F (40°C)
    - Seizures

### 2. "consultation"
- *Definition:* Non-emergency symptoms that require a doctor's evaluation within the next 24-48 hours.
- *Triggers:* Use this level for symptoms like:
    - A fever between 100.4°F (38°C) and 104°F (40°C).
    - Persistent vomiting or diarrhea.
    - Moderate pain (e.g., earache, stomach ache).
    - Skin rashes or infections.
    - Symptoms of cold/flu that are not improving after several days.
    - Any symptom that is persistent or worrying but not life-threatening.

### 3. "self_care"
- *Definition:* Minor ailments that can likely be managed at home. The user should still monitor their symptoms.
- *Triggers:* Use this for mild symptoms, especially when NO fever is present.
    - *CRUCIAL RULE:* A body temperature of 100.4°F (38°C) or higher is a fever. A temperature below this (e.g., 99°F, 37.5°C) is NOT a fever. Triage a normal/low-grade temperature as "self_care" unless other severe symptoms (like chest pain) are present.
    - Common cold, slight cough, or sore throat with no fever.
    - Minor headache that responds to rest.
    - General tiredness.

---

# JSON Output Structure
The output must be a valid JSON object with these three keys:
- "triage_level": (string) Must be one of "emergency", "consultation", or "self_care".
- "summary_of_symptoms": (string) A brief, neutral summary of the user's symptoms in English.
- "recommendation_text_punjabi": (string) Actionable advice in simple Punjabi (Gurmukhi script). The tone should be calm and reassuring.

---

# Examples

*Example 1: Emergency*
User Input: "ਮੈਨੂੰ ਛਾਤੀ ਵਿੱਚ ਬਹੁਤ ਦਰਦ ਹੋ ਰਿਹਾ ਹੈ ਅਤੇ ਸਾਹ ਨਹੀਂ ਆ ਰਿਹਾ" (I have severe chest pain and can't breathe)
Expected Output:
{{
    "triage_level": "emergency",
    "summary_of_symptoms": "User reports severe chest pain and difficulty breathing.",
    "recommendation_text_punjabi": "ਇਹ ਇੱਕ ਐਮਰਜੈਂਸੀ ਹੋ ਸਕਦੀ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਤੁਰੰਤ ਕਿਸੇ ਨੂੰ ਦੱਸੋ ਅਤੇ ਐਂਬੂਲੈਂਸ ਬੁਲਾਓ ਜਾਂ ਨਜ਼ਦੀਕੀ ਹਸਪਤਾਲ ਜਾਓ।"
}}

*Example 2: Consultation*
User Input: "I have 101 fever and a bad cough for 2 days"
Expected Output:
{{
    "triage_level": "consultation",
    "summary_of_symptoms": "User has a fever of 101°F and a cough for two days.",
    "recommendation_text_punjabi": "ਤੁਹਾਨੂੰ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਐਪ ਰਾਹੀਂ ਡਾਕਟਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ ਜਾਂ ਆਪਣੀ ਸਥਾਨਕ ਕਲੀਨਿਕ 'ਤੇ ਜਾਓ।"
}}

*Example 3: Self-Care*
User Input: "mera temperature 99 hai te thoda jukaam hai" (my temperature is 99 and I have a slight cold)
Expected Output:
{{
    "triage_level": "self_care",
    "summary_of_symptoms": "User reports a temperature of 99°F and a slight cold.",
    "recommendation_text_punjabi": "ਇਸ ਸਮੇਂ ਲੱਛਣ ਹਲਕੇ ਲੱਗ ਰਹੇ ਹਨ। ਆਰਾਮ ਕਰੋ, ਬਹੁਤ ਸਾਰਾ ਪਾਣੀ ਪੀਓ, ਅਤੇ ਗਰਮ ਚੀਜ਼ਾਂ ਦਾ ਸੇਵਨ ਕਰੋ। ਜੇਕਰ ਤੁਹਾਡੇ ਲੱਛਣ ਵਿਗੜਦੇ ਹਨ ਜਾਂ ਬੁਖਾਰ ਹੋ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਦੁਬਾਰਾ ਜਾਂਚ ਕਰੋ।"
}}

---

User Symptoms:
"{user_symptoms}"
"""


# --- API ENDPOINT ---


@app.route("/api/symptom-check", methods=["POST"])
def symptom_check():
    """
    Receives user symptoms, queries Gemini API, 
    and returns structured JSON with triage assessment.
    """
    if not model:
        return jsonify({"error": "Gemini client not initialized. Check API key."}), 500

    # Validate input
    data = request.get_json(silent=True)
    if not data or "text" not in data:
        return jsonify({"error": "Request must include 'text' field in JSON body."}), 400

    user_symptoms = data["text"]
    if not isinstance(user_symptoms, str) or not user_symptoms.strip():
        return jsonify({"error": "Symptom text must be a non-empty string."}), 400

    # Build prompt
    full_prompt = PROMPT_TEMPLATE.format(user_symptoms=user_symptoms)

    try:
        response = model.generate_content(full_prompt)

        # Ensure AI returned something
        if not response or not response.text:
            raise ValueError("Empty response from Gemini API.")

        ai_json = json.loads(response.text)

        # Validate structure
        required_keys = {"triage_level", "summary_of_symptoms", "recommendation_text_punjabi"}
        if not required_keys.issubset(ai_json):
            missing = required_keys - ai_json.keys()
            raise ValueError(f"Missing keys in AI response: {', '.join(missing)}")

        if ai_json["triage_level"] not in {"emergency", "consultation", "self_care"}:
            raise ValueError(f"Invalid triage_level: {ai_json['triage_level']}")

        return jsonify(ai_json), 200

    except json.JSONDecodeError:
        logging.error("Failed to decode AI response: not valid JSON.")
        return jsonify({"error": "AI did not return valid JSON."}), 500
    except ValueError as ve:
        logging.error(f"Validation error: {ve}")
        return jsonify({"error": str(ve)}), 500
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred with the AI service."}), 503

# --- FRONTEND SERVING ---

@app.route("/")
def serve_index():
    """Serves the index.html file from the current directory."""
    return send_from_directory(".", "index.html")

# --- RUN APP ---

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)