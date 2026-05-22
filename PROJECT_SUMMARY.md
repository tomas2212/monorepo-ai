# 📋 PROJEKT SUMMARY: MCP + Ollama Demo

## ✅ ČO BOLO VYTVORENÉ

### 1. BACKEND (apps/api) - Express Server
```
apps/api/
├── package.json          ← Závislosti (express, cors, axios)
└── src/
    ├── index.js          ← Express server + API endpoint
    │   • PORT: 3001
    │   • POST /api/process
    │   • GET /health
    │
    └── mcp-client.js     ← Komunikácia s Ollama
        • queryOllama(prompt) - volá localhost:11434

```

**Funkcionalita:**
- ✅ Ekspres API na porte 3001
- ✅ CORS povolený
- ✅ Priama komunikácia s Ollama cez axios
- ✅ Error handling

---

### 2. FRONTEND (apps/web) - React + MUI
```
apps/web/
├── package.json          ← Závislosti (react, @mui/material, axios)
└── src/
    ├── App.jsx           ← Hlavný komponent
    │   • Text input (MUI TextField)
    │   • Submit button (MUI Button)
    │   • Loading state
    │   • Error handling
    │   • Display results
    │
    └── App.css           ← Štýly

```

**Funkcionalita:**
- ✅ Vite React aplikácia na porte 5173
- ✅ MUI Material-UI komponenty
- ✅ Text input + submit button
- ✅ Zobrazenie výsledkov
- ✅ Error handling

---

### 3. DOKUMENTÁCIA
```
Root (C:\GIT\ai-monorepo\)
├── QUICKSTART.md         ← ⭐ ČÍTAJ TOTO NAJPRV (5 min start)
├── MCP_SETUP.md          ← Detailné nastavenie
├── MCP_EXPLAINED.md      ← Ako MCP funguje
└── package.json          ← Root config (turbo)

```

---

## 🔄 KOMUNIKAČNÝ TOK

```
1. FRONTEND (React)
   ├─ Zadá text do InputField
   ├─ Klikne "Spracovať" button
   └─ POST request: { text: "Čo je AI?" }
                      ↓
2. BACKEND (Express)
   ├─ Prijme POST /api/process
   ├─ Extrahuje text z JSON
   └─ Zavolá queryOllama(text)
                      ↓
3. OLLAMA (AI Model)
   ├─ Dostane: { model: "qwen3.5", prompt: "..." }
   ├─ Spracuje lokalny model
   └─ Vráti: { response: "AI je..." }
                      ↓
4. BACKEND (Express)
   ├─ Dostane výsledok
   └─ Vráti: { success: true, output: "AI je..." }
                      ↓
5. FRONTEND (React)
   ├─ Zobrazí výsledok v Card komponente
   └─ Ukazuje odpoveď

```

---

## 📦 NAINŠTALOVANÉ BALÍČKY

### Frontend (apps/web/package.json)
```json
"dependencies": {
  "react": "^19.2.6",
  "react-dom": "^19.2.6",
  "@mui/material": "^6.1.1",
  "@emotion/react": "^11.11.1",
  "@emotion/styled": "^11.11.0",
  "@mui/icons-material": "^6.1.1",
  "axios": "^1.6.0"
}
```

### Backend (apps/api/package.json)
```json
"dependencies": {
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "@modelcontextprotocol/sdk": "^0.5.2",
  "axios": "^1.6.0"
}
```

---

## 🚀 NA SPUSTENIE

### Krok 1: Spustit Ollama
```powershell
# NOVÝ TERMINAL
ollama run qwen3.5
```

### Krok 2: Spusti projekt
```powershell
# V koreňovom projekte
cd C:\GIT\ai-monorepo
pnpm dev:all
```

### Krok 3: Otvori prehliadač
- Frontend: http://localhost:5173
- Backend Health: http://localhost:3001/health

---

## 📖 KEĎ ČÍTAŠ KÓD

### Frontend - Ako sa posiela request?
**apps/web/src/App.jsx** (rôzne riadkov)
```jsx
const response = await axios.post(API_URL, { text: input });
```

### Backend - Ako sa spracováva?
**apps/api/src/index.js** (endpoint)
```javascript
app.post('/api/process', async (req, res) => {
  const result = await queryOllama(text);
  res.json({ success: true, output: result });
});
```

### Backend - Ako sa komunikuje s Ollama?
**apps/api/src/mcp-client.js** (query function)
```javascript
const response = await axios.post(
  'http://localhost:11434/api/generate',
  { model: 'qwen3.5', prompt: prompt }
);
```

---

## 🎯 ČOHO SOM DOSIAHNUL?

✅ **Úplne funkčný projekt s:**
- Modern Frontend (React + MUI)
- Simple Backend (Express)
- AI Integration (Ollama + qwen3.5)
- **100% Zadarmo** (bez API key)

✅ **Učí PRÁVE ako:**
- Pripojiť sa na LLM modely
- Komunikovať s AI API
- Buildiť Full-stack app
- Používať Ollama lokálne

---

## 📚 SÚBORY NA ČÍTANIE

1. **QUICKSTART.md** ← Začni tu
2. **MCP_SETUP.md** ← Detaily
3. **MCP_EXPLAINED.md** ← Theory

---

## 🔧 ĎALŠIE ROZŠÍRENIA

Ak chceš pokračovať, môžeš:
- ✅ Pridať ďalšie modely (dolphin-mixtral, neural-chat)
- ✅ Buildiť viacero endpoints
- ✅ Uložiť konverzácie (databáza)
- ✅ Pridať autentifikáciu
- ✅ Deployovať na produkciu

---

**Status: ✅ HOTOVO NA SPUSTENIE**

