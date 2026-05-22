// , { Request, Response }
import express from 'express';
import cors from 'cors';
import { queryOllama } from './mcp-client.ts';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Health check
// req: Request, res: Response
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Main endpoint - prijíma text z FE a spracuje cez MCP + Ollama
// req: Request, res: Response
app.post('/api/process', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text je povinný' });
    }

    console.log('📝 Spracovávam:', text);

    // Zavolaj MCP server s Ollama
    const result = await queryOllama(text);

    console.log('✅ Výsledok:', result);

    res.json({
      success: true,
      input: text,
      output: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Neznáma chyba';
    console.error('❌ Chyba:', errorMessage);
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API server beží na http://localhost:${PORT}`);
  console.log(`📡 Ujisti sa, že Ollama beží na http://localhost:11434`);
});

