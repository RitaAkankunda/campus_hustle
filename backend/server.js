const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

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

// JWT Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
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
app.post('/api/hustlers', async (req, res) => {
  try {
    const hustlers = readHustlers();

    // Check if email already exists
    const existingHustler = hustlers.find(h => h.email === req.body.email);
    if (existingHustler) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newHustler = {
      id: Date.now(),
      ...req.body,
      password: hashedPassword
    };

    hustlers.push(newHustler);
    writeHustlers(hustlers);

    // Don't send password back to client
    const { password: _, ...hustlerWithoutPassword } = newHustler;
    res.status(201).json(hustlerWithoutPassword);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hustlers = readHustlers();
    const hustler = hustlers.find(h => h.email === email);

    if (!hustler) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    // Check password - handle both hashed and plain text for migration
    let isValidPassword = false;
    if (hustler.password.startsWith('$2a$') || hustler.password.startsWith('$2b$') || hustler.password.startsWith('$2y$')) {
      // Password is hashed
      isValidPassword = await bcrypt.compare(password, hustler.password);
    } else {
      // Password is plain text (migration case)
      isValidPassword = hustler.password === password;
      if (isValidPassword) {
        // Hash the password for future logins
        const hashedPassword = await bcrypt.hash(password, 10);
        hustler.password = hashedPassword;
        writeHustlers(hustlers);
      }
    }

    if (!isValidPassword) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: hustler.id, email: hustler.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Don't send password back to client
    const { password: _, ...hustlerWithoutPassword } = hustler;
    res.json({
      success: true,
      hustler: hustlerWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Verify token endpoint
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  const hustlers = readHustlers();
  const hustler = hustlers.find(h => h.id === req.user.id);

  if (!hustler) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { password: _, ...hustlerWithoutPassword } = hustler;
  res.json({ hustler: hustlerWithoutPassword });
});

// Logout endpoint (client-side token removal, but we can blacklist if needed)
app.post('/api/auth/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// Update a hustler by ID (protected - users can only update their own profile)
app.put('/api/hustlers/:id', authenticateToken, (req, res) => {
  try {
    const id = req.params.id;

    // Check if user is updating their own profile
    if (req.user.id != id) {
      return res.status(403).json({ error: 'You can only update your own profile' });
    }

    const hustlers = readHustlers();
    const index = hustlers.findIndex(h => String(h.id) === String(id));
    if (index === -1) {
      return res.status(404).json({ error: 'Hustler not found' });
    }

    // Don't allow password updates through this endpoint (use separate endpoint)
    const { password, ...updateData } = req.body;

    // Merge existing data with updates, preserving the ID
    const updatedHustler = {
      ...hustlers[index],
      ...updateData,
      id: hustlers[index].id // Preserve original ID
    };

    hustlers[index] = updatedHustler;
    writeHustlers(hustlers);

    // Don't send password back to client
    const { password: _, ...hustlerWithoutPassword } = updatedHustler;
    res.json(hustlerWithoutPassword);
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
