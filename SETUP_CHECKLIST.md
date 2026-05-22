# ✅ SETUP CHECKLIST

Pred spustením skontroluj všetko podľa tohto checklistu:

## 🖥️ SYSTÉMOVÉ POŽIADAVKY

- [ ] Windows 10/11 (alebo Mac/Linux)
- [ ] Node.js 24+ (skontroluj: `node --version`)
- [ ] pnpm 11+ (skontroluj: `pnpm --version`)

## 🤖 OLLAMA

- [ ] Ollama stiahnutá z https://ollama.ai
- [ ] Ollama nainštalovaná
- [ ] Ollama spustená v termináli: `ollama run qwen3.5`
- [ ] Čakaj na stiahnutie modelu (prv run možno chvíľu trvať)
- [ ] Ollama dostupná na `http://localhost:11434`

## 📦 PROJEKT INŠTALÁCIA

```powershell
# Skontroluj či projekt je nainštalovaný
cd C:\GIT\ai-monorepo
pnpm install
```

- [ ] `pnpm install` skončil bez chýb
- [ ] `node_modules/` zložka existuje
- [ ] `apps/api/package.json` existuje
- [ ] `apps/web/package.json` existuje

## 🚀 SPUSTENIE

### Terminal 1: Ollama (NOVÝ TERMINAL)
```powershell
ollama run qwen3.5
```
- [ ] Ollama server je spustený
- [ ] Vidieť: `Successfully loaded model: qwen3.5`
- [ ] Port 11434 je otvorený

### Terminal 2: Frontend + Backend (HLAVNÝ TERMINAL)
```powershell
cd C:\GIT\ai-monorepo
pnpm dev:all
```

**Očakávaný output:**
```
⚽ Vite: ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help

[turbo] [DEV] apps/web:dev
[turbo] [DEV] apps/api:dev

🚀 API server beží na http://localhost:3001
📡 Ujisti sa, že Ollama beží na http://localhost:11434
```

- [ ] Frontend server sa spustil (Vite)
- [ ] Backend server sa spustil (Express)
- [ ] Žiadne error messages
- [ ] Port 5173 je dostupný (Frontend)
- [ ] Port 3001 je dostupný (Backend)

## 🌐 FRONTEND TEST

1. Otvori prehliadač: http://localhost:5173
2. Vidieť by si mal: `🤖 MCP + Ollama Demo`

- [ ] Aplikácia sa načítala bez chýb
- [ ] Text input je viditeľný
- [ ] Button "Spracovať" je viditeľný
- [ ] UI vyzerá korektne (MUI komponenty)

## 🧪 FUNKČNOSTI TEST

### Test 1: Backend Health

```powershell
# V termináli alebo Postmane
curl http://localhost:3001/health
```

Expected response:
```json
{"status":"ok"}
```

- [ ] Health endpoint vráti OK

### Test 2: Frontend Input + Submit

1. V prehliadači na http://localhost:5173
2. Zadaj text: `"Čo je AI?"`
3. Klikni button: `"Spracovať"`
4. Čakaj ~10-15 sekúnd

Expected:
- [ ] Loading spinner sa zobrazí
- [ ] Po čase sa Text zmení na "Spracovávam..."
- [ ] Odpoveď z Ollama sa zobrazí v "📋 Výsledok" sekcii

### Test 3: Error Handling

1. Zatvori Ollama (v Terminal 1)
2. V prehliadači sa pokúš znova: `"Testovací text"`
3. Klikni: `"Spracovať"`

Expected:
- [ ] Vidieť error: "Ollama nie je dostupná"
- [ ] Chyba sa zobrazí v červenej Alert sekcii
- [ ] Aplikácia sa nezastaví (graceful error)

4. Respusti Ollama:
```powershell
ollama run qwen3.5
```

5. Znova skúšaj frontend

- [ ] Po restarte Ollama bude opäť fungovať

## 📋 KÓDU KONTROLA

### Backend Files
```
apps/api/
├── package.json              ← 📄 Skontroluj
├── src/
│   ├── index.js             ← 📄 Skontroluj
│   └── mcp-client.js        ← 📄 Skontroluj
```

- [ ] `apps/api/src/index.js` existuje
- [ ] `apps/api/src/mcp-client.js` existuje
- [ ] Žiadne syntax errory (ESLint check)

### Frontend Files
```
apps/web/
├── package.json             ← 📄 Skontroluj
├── src/
│   ├── App.jsx              ← 📄 Skontroluj
│   ├── App.css
│   ├── main.jsx
│   └── index.css
```

- [ ] `apps/web/src/App.jsx` existuje
- [ ] `apps/web/package.json` má MUI dependencies
- [ ] Žiadne syntax errory

## 📚 DOKUMENTÁCIA CHECK

- [ ] README.md existuje a je čitateľný
- [ ] QUICKSTART.md existuje
- [ ] MCP_SETUP.md existuje
- [ ] MCP_EXPLAINED.md existuje
- [ ] ARCHITECTURE.md existuje
- [ ] PROJECT_SUMMARY.md existuje

## 🔗 PORTOV OVERENIE

```powershell
# Skontroluj či porty sú otvorené

# Frontend
curl http://localhost:5173

# Backend Health
curl http://localhost:3001/health

# Ollama
curl http://localhost:11434/api/tags
```

- [ ] Port 5173 je dostupný (Frontend)
- [ ] Port 3001 je dostupný (Backend)
- [ ] Port 11434 je dostupný (Ollama)

## 🎯 FINÁLNY TEST

1. **Zapni všetko znova:**
   ```powershell
   # Terminal 1: Ollama
   ollama run qwen3.5
   
   # Terminal 2: Projekt
   cd C:\GIT\ai-monorepo
   pnpm dev:all
   ```

2. **Otvori prehliadač:** http://localhost:5173

3. **Skúšaný viacero prompts:**
   - "Napíš mi vtip"
   - "Ako sa naučiť Python?"
   - "Čo je Git?"
   - "Opíš deň softvérového vývojára"

4. **Skontroluj všetko:**
   - [ ] Loading state vždy sa zobrazí
   - [ ] Odpovede sú rôzne (nie hard-coded)
   - [ ] Žiadne errory v browser console (F12)
   - [ ] Žiadne errory v terminal oknách

## 🆘 TROUBLESHOOTING

Ak niečo nejde podľa plánu:

1. **Skontroluj porty:**
   ```powershell
   netstat -ano | findstr :5173
   netstat -ano | findstr :3001
   netstat -ano | findstr :11434
   ```

2. **Reštartuj Ollama:**
   ```powershell
   # Zatvori Tab s Ollama (Ctrl+C)
   # Znova spusti:
   ollama run qwen3.5
   ```

3. **Vymazni cache & reinstaluj:**
   ```powershell
   cd C:\GIT\ai-monorepo
   rm pnpm-lock.yaml
   pnpm install
   ```

4. **Skontroluj Firewwall:**
   - Ujisti sa že Windows Firewall umožňuje Node.js

## ✅ HOTOVO!

Ak všetko prešlo, tak máš:

- ✅ Frontend React aplikácia s MUI
- ✅ Backend Express API
- ✅ Komuniakcia s Ollama AI modelom
- ✅ Pracovný MCP demo praktický príklad

---

**Gratulujeme! 🎉 Projekt je hotový a spustený!**

Teraz môžeš:
1. Experimentovať s rôznými prompts
2. Skúmať kód a učiť sa
3. Rozšíriť aplikáciu s novými features
4. Integrovať do svojich projektov

---

**Otázky? Čítaj:**
- QUICKSTART.md - Start v 5 min
- MCP_EXPLAINED.md - Ako to funguje
- ARCHITECTURE.md - Tech stack details

