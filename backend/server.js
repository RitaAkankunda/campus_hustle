const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

// CORS configuration for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// Increase JSON payload size limit for base64 images (50MB)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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

// Root route (friendly message)
app.get('/', (req, res) => {
  res.send('Campus Hustle backend — API available at /api/hustlers');
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Add a new hustler
app.post('/api/hustlers', (req, res) => {
  const hustlers = readHustlers();
  const newHustler = { id: Date.now(), ...req.body };
  hustlers.push(newHustler);
  writeHustlers(hustlers);
  res.status(201).json(newHustler);
});

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

// Get a single hustler by ID
app.get('/api/hustlers/:id', (req, res) => {
  const id = req.params.id;
  const hustlers = readHustlers();
  const hustler = hustlers.find(h => String(h.id) === String(id));
  if (!hustler) {
    return res.status(404).json({ error: 'Hustler not found' });
  }
  res.json(hustler);
});

// Update a hustler by ID
app.put('/api/hustlers/:id', (req, res) => {
  try {
    const id = req.params.id;
    const hustlers = readHustlers();
    const index = hustlers.findIndex(h => String(h.id) === String(id));
    if (index === -1) {
      return res.status(404).json({ error: 'Hustler not found' });
    }
    
    // Merge existing data with updates, preserving the ID
    const updatedHustler = { 
      ...hustlers[index], 
      ...req.body, 
      id: hustlers[index].id // Preserve original ID
    };
    
    hustlers[index] = updatedHustler;
    writeHustlers(hustlers);
    res.json(updatedHustler);
  } catch (error) {
    console.error('Error updating hustler:', error);
    res.status(500).json({ error: 'Failed to update hustler: ' + error.message });
  }
});

// Submit a review for a hustler
app.post('/api/hustlers/:id/reviews', (req, res) => {
  const id = req.params.id;
  const { name, rating, comment } = req.body;
  
  if (!name || !rating || !comment) {
    return res.status(400).json({ error: 'Name, rating, and comment are required' });
  }
  
  const hustlers = readHustlers();
  const index = hustlers.findIndex(h => String(h.id) === String(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Hustler not found' });
  }
  
  // Create review object
  const review = {
    id: Date.now().toString(),
    name,
    rating: parseInt(rating),
    comment,
    hustler: hustlers[index].name,
    university: hustlers[index].university || 'Makerere University',
    date: new Date().toISOString().split('T')[0]
  };
  
  // Update hustler's rating and review count
  const currentRating = hustlers[index].rating || 5;
  const currentReviewCount = hustlers[index].reviewCount || 0;
  const totalRating = currentRating * currentReviewCount;
  const newReviewCount = currentReviewCount + 1;
  const newRating = (totalRating + review.rating) / newReviewCount;
  
  hustlers[index].rating = Math.round(newRating * 10) / 10; // Round to 1 decimal
  hustlers[index].reviewCount = newReviewCount;
  
  writeHustlers(hustlers);
  
  res.status(201).json(review);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
