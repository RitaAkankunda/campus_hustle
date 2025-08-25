// Delete a hustler by ID
app.delete('/api/hustlers/:id', (req, res) => {
  const id = req.params.id;
  const hustlers = readHustlers();
  const index = hustlers.findIndex(h => String(h.id) === String(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Hustler not found' });
  }
  hustlers.splice(index, 1);
  writeHustlers(hustlers);
  res.json({ success: true });
});
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const DATA_FILE = './hustlers.json';

// Helper to read hustlers
function readHustlers() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

// Helper to write hustlers
function writeHustlers(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Get all hustlers
app.get('/api/hustlers', (req, res) => {
  res.json(readHustlers());
});

// Add a new hustler
app.post('/api/hustlers', (req, res) => {
  const hustlers = readHustlers();
  const newHustler = { id: Date.now(), ...req.body };
  hustlers.push(newHustler);
  writeHustlers(hustlers);
  res.status(201).json(newHustler);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
