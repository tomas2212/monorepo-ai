# ⚡ RÝCHLY START - MCP + Ollama Demo

## 5 MINÚT NA SPUSTENIE 🚀

### 1️⃣ PRÍPRAVA (2 minúty)

```powershell
# Otvri NOVÚ PowerShell/CMD a spusti Ollama
ollama run qwen3.5
```

⏳ **Čakaj na:** `Pulling model` → stahovanie modelov (pridelá to cca 5GB)

Keď uvidíš: `>>> ` prompt - Ollama je **GOTOVÁ** ✅

---

### 2️⃣ SPUSTENIE PROJEKTU (3 minúty)

```powershell
# V NOVEJ PowerShell - spusti všetko
cd C:\GIT\ai-monorepo

# Instalácia (již done, ale na istotu)
pnpm install

# SPÚŠŤ Všetko naraz
pnpm dev:all
```

**Očakávaný output:**
```
🚀 API server beží na http://localhost:3001
📡 Ujisti sa, že Ollama beží na http://localhost:11434

⚽ Vite: ready in 325 ms
...
```

---

### 3️⃣ OTVORI V PREHLIADAČI

1. **Frontend**: http://localhost:5173
2. Vidieť budeš: `🤖 MCP + Ollama Demo`
3. Zadaj text napr.: `"Čo je AI?"`
4. Klikni `Spracovať`
5. 🎉 Vidieť budeš odpoveď z Ollama!

---

## 📊 ŠTRUKTÚRA PROJEKTU

```
apps/
├── api/          ← Backend (Express na :3001)
│   └── src/
│       ├── index.js       (API endpoints)
│       └── mcp-client.js  (Komunikácia s Ollama)
│
└── web/          ← Frontend (React na :5173)
    └── src/
        ├── App.jsx       (MUI komponenty)
        └── index.css
```

---

## ✅ CHECKLIST

- [ ] Ollama nainštalovaná? (https://ollama.ai)
- [ ] `ollama run qwen3.5` beží v termináli?
- [ ] `pnpm dev:all` beží s dvoma procesami?
- [ ] Frontend otvorený na http://localhost:5173?
- [ ] Backend dostupný na http://localhost:3001/health?

---

## 🐛 RÝCHLÉ RIEŠENIA

### ❌ "Cannot connect to localhost:3001"
→ Skúšaj: `pnpm dev:api` v apps/api samostane

### ❌ "Ollama nie dostupna"
→ V NOVEJ PowerShell: `ollama run qwen3.5`

### ❌ "CORS Error"
→ CORS je povolený v Backend - skúšaj hard refresh (Ctrl+F5)

---

## 💡 TESTOVACÍ PROMPTS

Skúš tieto v aplikácii:

- ✅ `"Napíš 3 vtipy"`
- ✅ `"Čo je Git?"`
- ✅ `"Python vs JavaScript - porovnaj"`

---

## 📚 DETAILY

Čítajte viac:
- **MCP_SETUP.md** - Komplexné nastavenie
- **MCP_EXPLAINED.md** - Ako to všetko funguje

---

**GOTOVO! 🎉**

Teraz máš pracovný MCP demo s:
- ✅ React Frontend (MUI)
- ✅ Express Backend
- ✅ Lokálne AI (Ollama + qwen3.5)
- ✅ **100% Zadarmo** (bez API kľúčov)

