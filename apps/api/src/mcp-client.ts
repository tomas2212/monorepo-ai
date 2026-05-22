import axios from 'axios';

const OLLAMA_API = 'http://localhost:11434/api/generate';
// const MODEL = 'qwen3.5';
export const MODEL = ' qwen2.5:1.5b';

/**
 * Volá Ollama model cez REST API
 * MCP tu nie je potrebný - priamo komunikujeme s Ollama
 */
export async function queryOllama(prompt: string): Promise<string> {
  try {
    console.log(`🤖 Volám model: ${MODEL}`);
    
    const response = await axios.post(
      OLLAMA_API,
      {
        model: MODEL,
        prompt: prompt,
        stream: false,
        // temperature: 0.5,
        temperature: 1,
        // top_p: 0.8,
        // top_k: 20,
        // options: {
        //   num_predict: 150  //
        // }
      },
      {
        timeout: 10*60*1000 // 10 min timeout
      }
    );

    if (response.data && response.data.response) {
      return response.data.response;
    }
    
    throw new Error('Neplatná odpoveď z Ollama');
  } catch (error) {
    if (error instanceof Error) {
      if ((error as any).code === 'ECONNREFUSED') {
        throw new Error(
          `🚨 Ollama nie je dostupná. Spusti v termináli: ollama run ${MODEL}`
        );
      }
      throw new Error(`Chyba pri volaní Ollama: ${error.message}`);
    }
    throw new Error('Neznáma chyba pri volaní Ollama');
  }
}

