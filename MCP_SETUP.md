# 🤖 MCP + Ollama Demo Project

Komplexný príklad použitia **Model Context Protocol (MCP)** s lokálnym AI modelom **Ollama**.

## 📚 Povinnosti pred spustením

### 1. Inštalácia Ollama
```powershell
# Stiahni z https://ollama.ai
# Po inštalácii spusti v termináli:
ollama run qwen3.5
```

⚠️ **DÔLEŽITÉ:** Ollama musí bežať na **localhost:11434** pred spustením aplikácie!

### 2. Inštalácia závislostí
```powershell
pnpm install
```

## 🚀 Spustenie

### Variant 1: Spúšť všetko naraz (odporúčané)

```powershell
# V JEDNOM termináli - spúšť Turbo dev
pnpm dev:all
```

Aplikácie:
- **Frontend (React)**: http://localhost:5173
- **Backend (Express)**: http://localhost:3001

### Variant 2: Spustenie oddelene

**Terminál 1 - Backend:**
```powershell
cd apps/api
pnpm dev
```

**Terminál 2 - Frontend:**
```powershell
cd apps/web
pnpm dev
```

**Terminál 3 - Ollama (musí bežať!)**
```powershell
ollama run qwen3.5
```

## 🏗️ Projekto štruktúra

```
ai-monorepo/
├── apps/
│   ├── api/                 # Express backend
│   │   ├── src/
│   │   │   ├── index.js         # Server + API endpoint
│   │   │   └── mcp-client.js    # Komunikácia s Ollama
│   │   └── package.json
│   │
│   └── web/                 # React frontend (Vite)
│       ├── src/
│       │   ├── App.jsx          # Hlavný komponent s MUI
│       │   ├── App.css
│       │   └── index.css
│       └── package.json
│
├── package.json             # Root monorepo config
└── turbo.json              # Turbo build config
```

## 🔧 Ako to funguje?

### Tok dát:

```
Frontend (React)
    ↓ (POST: /api/process)
Express API
    ↓ (REST: http://localhost:11434/api/generate)
Ollama Server
    ↓ (Model: qwen3.5)
AI Výsledok
    ↑
Frontend (zobrazenie)
```

### Kroky:

1. **Používateľ** zadá text do inputu v React aplikácii
2. **Frontend** pošle POST request na `http://localhost:3001/api/process`
3. **Express backend** prijímame text v `mcp-client.js`
4. **Ollama** spracuje prompt cez model `qwen3.5`
5. **Backend** vráti výsledok ako JSON
6. **Frontend** zobrazí výsledok

## 📝 API Endpoints

### POST /api/process
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
  "output": "AI je... [odpoveď z Ollama]"
}
```

### GET /health
- Kontrola, či server beží: `http://localhost:3001/health`

## 🎯 Príklady prompts na testovanie

- "Napíš mi vtip o programátoroch"
- "Čo je JavaScript?"
- "Opíš typický deň softvérového vývojára"
- "Ako funuje Git?"

## 🐛 Troubleshooting

### Chyba: "Ollama nie je dostupná"
```
1. Skontroluj, či Ollama beží: ollama run qwen3.5
2. Skontroluj port: http://localhost:11434/api/generate
3. Reštartuj Ollama
```

### Chyba: "Cannot GET /api/process"
```
1. Ujisti sa, že Backend beží na http://localhost:3001
2. Skontroluj či Express počúva na správnom porte
3. Reštartuj backend: cd apps/api && pnpm dev
```

### CORS chyba
```
1. Backend by mal mať CORS zapnutý (je zahrnutý v express)
2. Skontroluj http://localhost:5173 (Frontend port)
```

## 📦 Nainštalované balíčky

### Frontend (apps/web)
- `react` - Framework
- `@mui/material` - UI komponenty
- `axios` - HTTP client

### Backend (apps/api)
- `express` - Web server
- `cors` - CORS middleware
- `axios` - HTTP client (pre Ollama)

## 🚀 Rozšírenie projektu

### Pridať viac modelov na Ollama:
```powershell
ollama run llama2      # Ďalší model
ollama run mistral     # Alebo tento
ollama list            # Zoznam všetkých
```

### Zmeniť model v backendu:
Zmeň v `apps/api/src/mcp-client.js`:
```javascript
const MODEL = 'llama2:latest';  // alebo iný model
```

### Pridať ďalšie API endpointy:
V `apps/api/src/index.js` pridaj nové route...

## 📚 Dokumentácia
- [Ollama Docs](https://ollama.ai)
- [MUI Docs](https://mui.com)
- [Express Docs](https://expressjs.com)

