import 'dotenv/config';
import express from 'express';
import { promises as fs } from 'fs';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());

// Serve static files from Vite build output
const distPath = path.join(__dirname, 'dist');
if (!existsSync(distPath)) {
  console.error('❌ ERROR: /dist folder not found!');
  console.error('   Run: npm run build');
  process.exit(1);
}

app.use(express.static(distPath));

// API Routes
app.post('/api/subscribe', async (req, res) => {
  const { email, zipCode } = req.body;
  const entry = { email, zipCode, timestamp: new Date().toISOString() };
  const filePath = path.join(__dirname, 'data', 'emails.json');
  try {
    let data = [];
    try {
      const existing = await fs.readFile(filePath, 'utf8');
      data = JSON.parse(existing);
    } catch (_) {}
    data.push(entry);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log('✉️  New signup:', email, zipCode);
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed' });
  }
});

app.get('/api/admin/emails', async (req, res) => {
  const { password } = req.query;
  if (password !== 'aio2026') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const filePath = path.join(__dirname, 'data', 'emails.json');
    const data = await fs.readFile(filePath, 'utf8');
    res.json({ emails: JSON.parse(data) });
  } catch (_) {
    res.json({ emails: [] });
  }
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Aio server running on port ${PORT}`);
  console.log(`🌐 Open http://localhost:${PORT} in your browser`);
});
