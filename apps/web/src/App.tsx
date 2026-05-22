import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:3001/api/process';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!input.trim()) {
      setError('Prosím, zadaj nejaký text');
      return;
    }

    setLoading(true);
    setError('');
    setOutput('');

    try {
      console.log('📤 Posielam na API:', input);
      const response = await axios.post(API_URL, { text: input });

      if (response.data.success) {
        setOutput(response.data.output);
        console.log('✅ Úspešne:', response.data.output);
      } else {
        setError('Chyba: ' + response.data.error);
      }
    } catch (err) {
      const errorMessage = 
        axios.isAxiosError(err) && err.response?.data?.error 
          ? (err.response.data.error as string)
          : err instanceof Error
          ? err.message
          : 'Nepodarilo sa pripojiť na server';
      
      setError(errorMessage);
      console.error('❌ Chyba:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit();
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        🤖 MCP + Ollama Demo
      </Typography>

      <Card sx={{ mb: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Zadaj otázku alebo text:
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Napr: Čo je AI? Alebo: Opíš deň programátora..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError('');
              }}
              onKeyPress={handleKeyPress}
              disabled={loading}
              variant="outlined"
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
            onClick={handleSubmit}
            disabled={loading}
            size="large"
          >
            {loading ? 'Spracovávam...' : 'Spracovať'}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <strong>Chyba:</strong> {error}
        </Alert>
      )}

      {output && (
        <Card sx={{ boxShadow: 3, backgroundColor: '#f5f5f5' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              📋 Výsledok:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontFamily: 'monospace',
                backgroundColor: '#fff',
                p: 2,
                borderRadius: 1,
              }}
            >
              {output}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Box sx={{ mt: 4, p: 2, backgroundColor: '#f0f0f0', borderRadius: 1 }}>
        <Typography variant="caption" color="textSecondary">
          ℹ️ Ujisti sa, že:
          <br />
          1. Backend beží na: http://localhost:3001
          <br />
          2. Ollama beží na: http://localhost:11434
          <br />
          3. Pripojeného modelu (qwen3.5) si nainštaloval
        </Typography>
      </Box>
    </Container>
  );
}

export default App;
