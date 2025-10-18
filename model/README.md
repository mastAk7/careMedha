
## 1) Features

- 🔒 Environment‑based API key loading via `.env` (no secrets in code)
- 🏥 Guard‑railed prompt that **forces JSON** output (via `response_mime_type`)
- 🌐 Simple REST endpoint: `POST /api/symptom-check`
- 🗣️ Punjabi recommendations injected **only** by the backend for safety
- 🖥️ Static `index.html` served from project root (optional frontend)
- ✅ Clear error messages and status codes for common failure modes

---

## 2) Tech Stack

- **Python 3.10+**
- **Flask**
- **python-dotenv**
- **google-generativeai** (Gemini 1.5 Flash)

---

## 3) Project Structure

```
.
├─ app.py                 # Flask app (provided)
├─ index.html             # (optional) simple frontend served at '/'
├─ requirements.txt       # Python dependencies
├─ .env                   # GEMINI_API_KEY=... (not committed)
└─ README.md              # This file
```

> If you don't have an `index.html` yet, the API still works; only `/` route will 404.

---

## 4) Prerequisites

- Python **3.10 or newer** (check with `python --version`)
- (Windows) PowerShell

---

## 5) Configuration

Create a `.env` file in the project root with your key:

```ini
# .env
GEMINI_API_KEY=YOUR_REAL_KEY_HERE(check whatsapp)
# Optional: change Flask port (defaults to 5000 in code)
PORT=5000
```

> Never commit `.env` to version control.

---

## 6) Setup a Virtual Environment & Install Deps

### macOS / Linux
```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### Windows (PowerShell)
```powershell/vscode terminal in the root folder or main.py
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```


---

## 7) Run the Server (Local Dev)

With your virtualenv **activated** and `.env` in place:

```bash
python app.py
```

By default, the app runs at `http://0.0.0.0:5000` (reachable at `http://localhost:5000`).

You can change the port by setting `PORT` in `.env`.

---


### Browser
If you have an `index.html` in the project root, visit:  
`http://localhost:5000/`

---

## 9) API Contract

**Endpoint:** `POST /api/symptom-check`  
**Body:**
```json
{ "text": "free-form symptom description..." }
```
**Response 200 OK:**
```json
{
  "triage_level": "emergency|consultation|self_care",
  "summary_of_symptoms": "string",
  "recommendation_text_punjabi": "string"
}
```
**Errors:**
- `400` – invalid JSON body or empty `text`
- `500` – model not initialized / invalid AI output
- `503` – AI provider error or temporary failure

---

## 10) How It Works (Brief)

1. **Prompting:** The server sends your text into a strict prompt asking Gemini to return only JSON with `triage_level` & `summary_of_symptoms`.
2. **Validation:** The response is parsed as JSON; server checks presence of both keys and that `triage_level` is in the allow‑listed set.
3. **Punjabi Recommendation:** The server adds `recommendation_text_punjabi` by mapping the triage level to fixed, audited strings.
4. **Return:** A safe, consistent JSON shape is returned to the client.

---

## 11) CORS (If Frontend is on a Different Origin)

If your frontend runs on another origin (e.g., `http://localhost:5173`), enable CORS in Flask:

```bash
pip install flask-cors
```

```python
# top of app.py
from flask_cors import CORS

# after app = Flask(...)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # tighten in prod
```


## 13) Health Check

Add a simple route:
```python
@app.get("/healthz")
def health():
    return {"status": "ok"}, 200
```

Check:
```bash
curl http://localhost:5000/healthz
```

---

## 14) Troubleshooting

- **`Gemini client not initialized`**  
  Ensure `.env` exists and `GEMINI_API_KEY` is correct. Print `os.getenv("GEMINI_API_KEY")` for sanity checks (do not log in prod).

- **`Failed to decode AI response`**  
  Sometimes models return non‑JSON (safety blocks, etc.). Retry with simpler text; keep `response_mime_type="application/json"` as in code.

- **`Invalid or missing JSON body`**  
  Ensure your request uses `Content-Type: application/json` and includes a `text` key with a non‑empty string.

- **CORS / 4xx in browser**  
  Enable and configure CORS if calling the API from a different origin (see §11).

---

## 15) Security Notes

- Never echo the raw API key back to clients or logs.
- Keep Punjabi recommendations **server‑side** to prevent prompt injection.
- Consider rate limiting and request size limits (`MAX_CONTENT_LENGTH`) in Flask.
- Use HTTPS in production.

---

## 16) License

MIT (or your preferred license)

