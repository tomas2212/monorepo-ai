# 🤖 AI Monorepo - MCP + Ollama Demo

> Jednoduchá **full-stack aplikácia** s AI integrujúcou Model Context Protocol a Ollama modelmi.

## 🎯 Čo je toto?

Komplexný príklad ako buildiť aplikáciu s:
- ✅ **Frontend**: React + Material-UI (Vite)
- ✅ **Backend**: Express.js na Node.js
- ✅ **AI Model**: Ollama s qwen3.5 (lokalny, zadarmo)
- ✅ **Protokol**: REST API komunikácia

## 🚀 Rýchly Start (5 minút)

### Pred spustením potrebuješ:

1. **Ollama** - Stiahni z https://ollama.ai a nainštaluj
2. **Node.js** - Verzia 24+ (máš)
3. **pnpm** - Balíčkovač (máš)

### Start:

```powershell
# Terminal 1: Spusti Ollama
ollama run qwen3.5

# Terminal 2: Spusti projekt
cd C:\GIT\ai-monorepo
pnpm dev:all
```

Potom otvori:
- **Frontend**: http://localhost:5173
- **API Health**: http://localhost:3001/health

---

## 📚 Dokumentácia

| Dokument | Obsah |
|----------|-------|
| **[QUICKSTART.md](./QUICKSTART.md)** | ⭐ Start v 5 minútach |
| **[MCP_SETUP.md](./MCP_SETUP.md)** | 📖 Detailné nastavenie |
| **[MCP_EXPLAINED.md](./MCP_EXPLAINED.md)** | 🔬 Ako MCP funguje |
| **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** | 📋 Projekt overview |

---

## 📂 Projekto Štruktúra

```
ai-monorepo/
├── apps/
│   ├── api/                    # Express Backend
│   │   ├── src/
│   │   │   ├── index.js           (API Endpoints)
│   │   │   └── mcp-client.js      (Ollama Communication)
│   │   └── package.json
│   │
│   └── web/                    # React Frontend
│       ├── src/
│       │   ├── App.jsx            (Main Component)
│       │   ├── App.css
│       │   └── index.css
│       ├── public/
│       └── package.json
│
├── package.json                # Root workspace config
├── turbo.json                  # Turbo build config
├── pnpm-workspace.yaml         # pnpm workspace
│
└── DOCS/
    ├── QUICKSTART.md           # 5-minute setup
    ├── MCP_SETUP.md            # Complete guide
    ├── MCP_EXPLAINED.md        # How it works
    └── PROJECT_SUMMARY.md      # Tech overview

```

---

## ✨ Features

### Frontend (React + MUI)
- 📝 Text input (Material-UI)
- 🔘 Submit button s hover effects
- ⏳ Loading state (spinner)
- ⚠️ Error handling
- 📊 Display results

### Backend (Express)
- 🚀 REST API endpoints
- 📡 CORS enabled
- 🤖 Ollama integration
- ⚡ Error handling

### AI (Ollama)
- 🪶 qwen3.5 model
- 💻 Localhost execution
- 🆓 Completely free
- ⚙️ No API key needed

---

## 🔄 Tok Dát

```
User Input (Frontend)
    ↓
POST /api/process
    ↓
Express Backend
    ↓
queryOllama(prompt)
    ↓
Ollama Model (qwen3.5)
    ↓
AI Response
    ↓
Return JSON
    ↓
Display in Frontend
```

---

## 📥 Inštalácia

```bash
# Klon repo (ak potrebný)
cd C:\GIT\ai-monorepo

# Inštaluj závislosti
pnpm install

# Stiahni Ollama model
ollama run qwen3.5

# Spusti projekt
pnpm dev:all
```

---

## 🎮 Ako Používať

1. **Otvori** http://localhost:5173
2. **Zadaj** text napr.: "Čo je AI?"
3. **Klikni** "Spracovať"
4. **Čakaj** na odpoveď z Ollama
5. **Vidieť** výsledok v UI

### Príkladní Prompts:
- "Napíš mi vtip"
- "Čo je JavaScript?"
- "Opíš deň vývojára"
- "Ako používam Git?"

---

## 🔌 API Endpoints

### POST /api/process
Spracuje text cez AI model

**Request:**
```json
{
  "text": "Čo je AI?"
}
```

**Response:**
```json
{
  "success": true,
  "input": "Čo je AI?",
  "output": "AI (Artificial Intelligence) je..."
}
```

### GET /health
Kontrola stavu servera

**Response:**
```json
{
  "status": "ok"
}
```

---

## 🛠️ Príkazy

```bash
# Development
pnpm dev:all       # Spustí Frontend + Backend
pnpm dev:web       # Len Frontend (Vite)
pnpm dev:api       # Len Backend (Express)

# Build
pnpm build         # Build všetkého

# Lint
pnpm lint          # Kontrola kódu
```

---

## 🐛 Troubleshooting

### ❌ "Ollama nie je dostupná"
```
Riešenie: V novom termináli spusti: ollama run qwen3.5
```

### ❌ "Cannot connect to localhost:3001"
```
Riešenie: Skúš pnpm dev:api v apps/api adresári
```

### ❌ "CORS Error"
```
Riešenie: CORS je povolený - skúšaj hard refresh (Ctrl+F5)
```

### ❌ "Port already in use"
```
Riešenie: Zmeniť port v:
- Frontend: apps/web/vite.config.js
- Backend: apps/api/src/index.js (PORT = 3001)
```

---

## 📚 Learn More

- [Ollama Documentation](https://ollama.ai)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Express.js](https://expressjs.com)
- [Material-UI](https://mui.com)
- [React](https://react.dev)

---

## 🤝 Contributing

Feel free to modify a rozšíriť projekt:
1. Fork / Clone
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open PR

---

## 📄 License

MIT - Voľne sa dá používať a modifikovať

---

## 🎓 Čo sa naučíš?

✅ Buildiť full-stack aplikáciu
✅ Integrovať AI modely
✅ Pracovať s REST API
✅ React + MUI komponenty
✅ Node.js backend
✅ Error handling
✅ Monorepo štruktúra (turborepo, pnpm)

---

## 🚀 Nasledujúce Kroky

1. 📖 Čítaj **QUICKSTART.md** (5 min)
2. 🚀 Spusti projekt
3. 🔬 Experimentuj s AI modelmi
4. 🧠 Skúmaj kód a pochop tok
5. 🎨 Rozšír si svoju aplikáciu

---

**Hotovo! 🎉 Vítaj v MCP + Ollama svete!**

