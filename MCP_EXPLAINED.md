# 🔌 MCP (Model Context Protocol) Vysvetlenie

## Čo je MCP?

**Model Context Protocol** je štandard na komunikáciu medzi aplikáciami a AI modelmi. Pomocou MCP môžeš:

- ✅ Pripojiť sa na lokálne AI modely
- ✅ Zavolať vzdialené API
- ✅ Spracovávať dáta cez AI bez cloudovej závislosti
- ✅ Integrovať LLM (Large Language Models) do tvojich aplikácií

## Ako FungUJE v TOMTO PROJEKTE?

### Bezplatné riešenie bez MCP SDK

Tento projekt **NEPOUŽÍVA** komplexný MCP SDK, ale **priamą komunikáciu s Ollama**:

```
┌─────────────────────────────────────────┐
│  Frontend (React s MUI)                  │
│  ┌─ "Čo je AI?" ─────────────────────┐  │
│                                        │  │
└────────────────┬────────────────────────┘
                 │ POST JSON
                 ▼
┌─────────────────────────────────────────┐
│  Backend (Express)                       │
│  ┌─ Prijme {"text": "Čo je AI?"}─────┐  │
│  │ mcp-client.js                       │  │
│  │ - Transformuje prompt              │  │
│  │ - Volá Ollama API                  │  │
│  └─────────────────────────────────────┘  │
└────────────────┬────────────────────────┘
                 │ HTTP
                 ▼
┌─────────────────────────────────────────┐
│  Ollama (localhost:11434)                │
│  ┌─ Model: qwen3.5 ─────────────────┐  │
│  │ Generuje odpoveď z promptu        │  │
│  └─────────────────────────────────────┘  │
└────────────────┬────────────────────────┘
                 │ JSON Response
                 ▼
┌─────────────────────────────────────────┐
│  Backend (Express)                       │
│  ┌─ Vráti JSON {"output": "response"}──┐ │
└────────────────┬────────────────────────┘
                 │
                 ▼ JSON
┌─────────────────────────────────────────┐
│  Frontend (zobrazenie výsledku)          │
└─────────────────────────────────────────┘
```

## V TOMTO PROJEKTE

### 1. Frontend poslanie dáta

**apps/web/src/App.jsx:**
```jsx
const response = await axios.post(
  'http://localhost:3001/api/process',
  { text: input }  // {"text": "Čo je AI?"}
);
```

### 2. Backend Spracovanie

**apps/api/src/index.js:**
```javascript
app.post('/api/process', async (req, res) => {
  const { text } = req.body;
  const result = await queryOllama(text);  // Zavolaj Ollama
  res.json({ success: true, output: result });
});
```

### 3. Komunikácia s Ollama

**apps/api/src/mcp-client.js:**
```javascript
export async function queryOllama(prompt) {
  const response = await axios.post(
    'http://localhost:11434/api/generate',
    {
      model: 'qwen3.5',
      prompt: prompt,
      stream: false
    }
  );
  return response.data.response;
}
```

## Prečo "MCP" v názve?

Hoci to nie je **formálny MCP Server**, je to **koncept rovnaký**:
- Je to **protokol komunikácie**
- Máš **model** (Ollama)
- Máš **context** (prompt od užívateľa)
- Máš **structured response**

## PRAVÝ MCP SDK by vyzerá takto:

Keby si chcel použiť **Anthropic SDK s MCP**:

```javascript
import Anthropic from "@anthropic-sdk/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // Potrebuješ API kľúč (platené)
});

const response = await client.messages.create({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 1024,
  messages: [{ role: "user", content: prompt }],
});
```

**ALE V TOMTO PROJEKTE:**
- Používame **lokalny Ollama** (zadarmo)
- **Žiadne API kľúče** potrebné
- **Bezplatne bez limity**

## Výhody nášho riešenia

| Vlastnosť | Náš Projekt | Anthropic SDK |
|-----------|-----------|---------------|
| Cena | 🟢 Zadarmo | 🔴 Placené |
| Kľúč API | 🟢 Nie | 🔴 Áno |
| Lokálnosť | 🟢 100% | 🔴 Cloud |
| Model | 🟢 Ľubovoľný (Ollama) | 🔴 Náznaný (Claude) |
| Rýchlosť | 🟢 Rýchla | 🟡 Závisí |

## Ako pridať ďalšie modely?

```powershell
# Stiahnemodeľ
ollama run dolphin-mixtral  # Powerful model
ollama run neural-chat      # Malý & rýchly
ollama run orca-mini        # Veľmi malý

# Zoznam
ollama list

# Zmeň v apps/api/src/mcp-client.js
const MODEL = 'dolphin-mixtral:latest';
```

## Nasledujúce kroky

1. **Spusti projekt**: `pnpm dev:all`
2. **Testuj** s rôznymi prompts
3. **Rozšír** s vlastnými endpointmi
4. **Integruj** do svojich aplikácií

## Zdroje

- [Ollama Models](https://ollama.ai/library)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Anthropic SDK](https://github.com/anthropics/anthropic-sdk-js)

