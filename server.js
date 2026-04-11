const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.post('/api/subscribe', async (req, res) => {
  const { email, zipCode } = req.body;
  const entry = { email, zipCode, timestamp: new Date().toISOString(), type: 'customer' };
  const filePath = path.join(__dirname, 'data', 'emails.json');
  try {
    let data = [];
    try {
      const existing = await fs.readFile(filePath, 'utf8');
      data = JSON.parse(existing);
    } catch (e) {}
    data.push(entry);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log('New signup:', email, zipCode);
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log('✅ Aio server running on port ' + PORT);
  console.log('🌐 Open http://87.99.155.192 in your browser');
});
