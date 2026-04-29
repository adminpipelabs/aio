const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from build folder
const buildPath = path.join(__dirname, 'build');
const buildExists = require('fs').existsSync(buildPath);

if (!buildExists) {
  console.error('❌ ERROR: /build folder not found!');
  console.error('   Run: npm run build');
  process.exit(1);
}

app.use(express.static(buildPath));

// SPA fallback
app.get('/{*path}', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(buildPath, 'index.html');
  res.sendFile(indexPath);
});

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
    } catch (e) {}
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
  } catch (error) {
    res.json({ emails: [] });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('✅ Aio server running on port ' + PORT);
  console.log('🌐 Open http://localhost:' + PORT + ' in your browser');
});
