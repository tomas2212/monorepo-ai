# 🏗️ ARCHITECTURE - Projekto Štruktúra

## Vizuálny Diagram

```
┌───────────────────────────────────────────────────────────────────┐
│                        FRONTEND LAYER                              │
│                    (React + Vite + MUI)                            │
│                   http://localhost:5173                            │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │  App.jsx                                                 │     │
│  ├──────────────────────────────────────────────────────────┤     │
│  │  • TextField (MUI) - textový vstup                       │     │
│  │  • Button (MUI) - "Spracovať"                           │     │
│  │  • Card - zobrazenie výsledkov                          │     │
│  │  • Alert - error handling                               │     │
│  │  • CircularProgress - loading state                     │     │
│  │                                                          │     │
│  │  axios.post('http://localhost:3001/api/process')        │     │
│  └─────────────────────────┬──────────────────────────────┘     │
└────────────────────────────┼───────────────────────────────────────┘
                             │
                    HTTP POST (JSON)
         { "text": "Čo je AI?" }
                             │
                             ▼
┌───────────────────────────────────────────────────────────────────┐
│                        BACKEND LAYER                               │
│                  (Express.js + Node.js)                           │
│                   http://localhost:3001                            │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │  index.js (Express Server)                               │     │
│  ├──────────────────────────────────────────────────────────┤     │
│  │  • app.post('/api/process')                              │     │
│  │    - Prijme JSON s textom                                │     │
│  │    - Extrahuje text z req.body                           │     │
│  │    - Zavolá queryOllama(text)                            │     │
│  │                                                          │     │
│  │  • app.get('/health')                                    │     │
│  │    - Kontrola stavu servera                              │     │
│  │                                                          │     │
│  │  • CORS middleware                                       │     │
│  │  • JSON parser                                           │     │
│  └─────────────────────────┬──────────────────────────────┘     │
│                            │                                      │
│  ┌─────────────────────────▼──────────────────────────────┐     │
│  │  mcp-client.js (Ollama Communication)                   │     │
│  ├──────────────────────────────────────────────────────────┤     │
│  │  • queryOllama(prompt)                                   │     │
│  │    - axios.post na Ollama API                            │     │
│  │    - Model: qwen3.5                                     │     │
│  │    - Parametry: prompt, temperature, stream             │     │
│  │                                                          │     │
│  │  • Error handling s user-friendly chybami               │     │
│  └─────────────────────────┬──────────────────────────────┘     │
└────────────────────────────┼───────────────────────────────────────┘
                             │
                    HTTP POST (JSON)
    { "model": "qwen3.5", "prompt": "..." }
                             │
                             ▼
┌───────────────────────────────────────────────────────────────────┐
│                        AI LAYER                                    │
│                   Ollama (localhost:11434)                        │
│                                                                    │
│  ┌────────────────────────────────────────────────────────┐      │
│  │  Model: qwen3.5                                       │      │
│  ├────────────────────────────────────────────────────────┤      │
│  │  • Spracovanie príkazov (prompts)                       │      │
│  │  • Generovanie textových odpovedí                      │      │
│  │  • Beží 100% lokálne (bez internetu)                   │      │
│  │  • Zadarmo, bez API kľúčov                             │      │
│  │                                                        │      │
│  │  Spotrebované: ~8GB RAM                                │      │
│  │  Čas odozvy: ~5-15 sekúnd (závisí od PC)              │      │
│  └────────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Directory Structure

```
C:\GIT\ai-monorepo/
│
├── 📄 README.md                  ← Projekt overview
├── 📄 QUICKSTART.md              ← 5-minute start
├── 📄 MCP_SETUP.md               ← Detailed setup
├── 📄 MCP_EXPLAINED.md           ← Theory
├── 📄 PROJECT_SUMMARY.md         ← Tech summary
├── 📄 ARCHITECTURE.md            ← Toto (architecture)
│
├── 📦 package.json               ← Monorepo root config
├── 📦 pnpm-workspace.yaml        ← pnpm workspace setup
├── 📦 turbo.json                 ← Turbo build config
├── 📄 eslint.config.js           ← Linting rules
├── 📄 prettier.config.js         ← Code formatting
│
├── .idea/                        ← IDE config
│   └── modules.xml               ← Module definitions
│
├── ai-monorepo.iml               ← JetBrains project file
│
└── apps/                         ← Applications
    │
    ├── api/                      ← Backend (Express)
    │   ├── 📦 package.json
    │   ├── src/
    │   │   ├── 📄 index.js       ← Express server
    │   │   └── 📄 mcp-client.js  ← Ollama API client
    │   └── 📁 node_modules/
    │
    └── web/                      ← Frontend (React + Vite)
        ├── 📦 package.json
        ├── 📄 vite.config.js     ← Vite configuration
        ├── public/
        │   ├── 📄 favicon.svg
        │   └── 📄 icons.svg
        ├── src/
        │   ├── 📄 main.jsx       ← React entry point
        │   ├── 📄 App.jsx        ← Main component
        │   ├── 📄 App.css
        │   ├── 📄 index.css
        │   └── assets/
        │       ├── 📄 hero.png
        │       ├── 📄 react.svg
        │       └── 📄 vite.svg
        ├── dist/                 ← Build output
        └── 📁 node_modules/

```

---

## 🔄 Dataflow Diagram

### Happy Path (úspešný flow)

```
START
  │
  ├─► User zadá text v Frontend
  │   ↓
  ├─► Frontend pošle POST /api/process
  │   │  Headers: Content-Type: application/json
  │   │  Body: { text: "Čo je AI?" }
  │   ↓
  ├─► Backend prijímá request
  │   │  res.body: { text: "Čo je AI?" }
  │   ↓
  ├─► queryOllama() je zavolaná
  │   │  prompt = "Čo je AI?"
  │   ↓
  ├─► axios.post(Ollama API)
  │   │  URL: http://localhost:11434/api/generate
  │   │  Data: { model: "qwen3.5", prompt: "..." }
  │   ↓
  ├─► Ollama model spracováva
  │   │  Čas: ~5-15 sekúnd
  │   ↓
  ├─► Ollama vráti response
  │   │  { response: "AI je... [text od modelu]" }
  │   ↓
  ├─► Backend spracuje response
  │   │  result = response.data.response
  │   ↓
  ├─► Backend vráti JSON
  │   │  { success: true, input: "...", output: "..." }
  │   ↓
  ├─► Frontend zobrazí resultat
  │   │  setOutput(response.data.output)
  │   ↓
  └─► END - Výsledok viditeľný v UI

```

### Error Path

```
IF Ollama nie je dostupná:
  ├─► queryOllama() throws error
  ├─► Backend catches error
  ├─► Backend vráti: { success: false, error: "..." }
  ├─► Frontend zobrazí: <Alert severity="error">
  └─► User vidí: "🚨 Ollama nie je dostupná"

IF Neplatný input:
  ├─► Frontend validuje: if (!input.trim())
  ├─► setError("Prosím, zadaj nejaký text")
  ├─► Frontend zobrazí: <Alert severity="error">
  └─► User vidí: error message

IF Network error:
  ├─► axios throws error
  ├─► Frontend catches error
  ├─► Frontend zobrazí: error message
  └─► User vidí: "Nepodarilo sa pripojiť na server"
```

---

## 🔌 API Contract

### Request/Response Schéma

```
┌─ POST /api/process
│
├─ REQUEST
│  ├─ Content-Type: application/json
│  └─ Body:
│     {
│       "text": string (required)
│     }
│
└─ RESPONSE
   ├─ Success (200):
   │  {
   │    "success": true,
   │    "input": string,
   │    "output": string
   │  }
   │
   └─ Error (500):
      {
        "success": false,
        "error": string
      }
```

---

## 🧵 Thread/Process Model

```
┌────────────────────────────────────────────────────────┐
│         PROCESS: Node.js Express Server                │
│                (PID: xxx)                              │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Main Thread                                           │
│  ├─► Listen on port 3001                             │
│  ├─► Handle GET /health                              │
│  └─► Handle POST /api/process                        │
│       ├─► queryOllama() [async/await]                │
│       │   └─► Čakaj na Ollama response               │
│       └─► Vrať výsledok                              │
│                                                        │
│  Worker Pool (axios)                                  │
│  └─► HTTP connections k Ollama                       │
│                                                        │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│         PROCESS: Ollama                                │
│                (PID: yyy)                              │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Listen on localhost:11434                            │
│  ├─► Accept API requests                             │
│  ├─► Load qwen3.5 model (~8GB RAM)                  │
│  ├─► Process prompt                                  │
│  └─► Generate response                               │
│                                                        │
└────────────────────────────────────────────────────────┘

```

---

## 📊 Technology Stack

| Layer | Technology | Version | Role |
|-------|-----------|---------|------|
| **Frontend** | React | 19.2.6 | UI Framework |
| | Vite | 8.0 | Build tool |
| | MUI | 6.1.1 | Component library |
| | @emotion | 11.11 | CSS-in-JS |
| | axios | 1.6.0 | HTTP client |
| **Backend** | Express | 4.18.2 | Web framework |
| | Node.js | 24+ | Runtime |
| | cors | 2.8.5 | CORS middleware |
| | axios | 1.6.0 | HTTP client |
| **Build** | pnpm | 11.1.3 | Package manager |
| | turbo | 2.9.14 | Monorepo builder |
| **AI** | Ollama | Latest | Model runtime |
| | qwen3.5 | 8B params | AI Model |

---

## 🎯 Performance Metrics

```
Frontend Load Time:     ~500ms (Vite dev)
Backend Response Time:  <100ms (without AI)
AI Generation Time:     5-15 seconds (qwen3.5, depends on PC)
Total Request Time:     5-15 seconds (mostly waiting for AI)

Memory Usage:
  ├─ Node.js Backend:   ~150MB
  ├─ Vite Dev Server:   ~300MB
  ├─ qwen3.5 Model:    ~8GB (loaded)
  └─ Total:             ~8.5GB
```

---

## 🔐 Security Considerations

- ✅ No sensitive data stored
- ✅ No authentication needed (localhost only)
- ✅ CORS enabled (development safe)
- ✅ Input validation (basic)
- ✅ Error messages don't expose system info

---

## 🚀 Deployment Considerations

For production:
1. Add authentication
2. Implement rate limiting
3. Add request validation
4. Use environment variables
5. Add logging/monitoring
6. Deploy Ollama separately
7. Use reverse proxy (nginx)
8. Add CI/CD pipeline

---

## 📈 Scalability

Current bottleneck: **Ollama Model Performance**

To scale:
1. Use faster models (orca-mini)
2. Add model distribution
3. Implement caching layer
4. Add request queue system
5. Deploy multiple Ollama instances

---

**End of Architecture Document**

