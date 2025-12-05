const express = require('express');
const mongoose = require('mongoose');
const Scheme = require('./models/Scheme');
const Method = require('./models/Method');

const app = express();
const PORT = 5000;

// middleware to parse JSON bodies (for future POST/PUT)
app.use(express.json());

// manual CORS header (no cors package needed, just HTTP headers)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// connect to MongoDB (AgroFarm DB)
mongoose
  .connect('mongodb://127.0.0.1:27017/AgroFarm')
  .then(() => console.log('✅ MongoDB connected (AgroFarm database)'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// GET /api/methods -> sustainable farming methods
app.get('/api/methods', async (req, res) => {
  try {
    const methods = await Method.find().lean();
    res.status(200).json(methods);
  } catch (err) {
    console.error('Error fetching methods from DB:', err);
    res.status(500).json({ message: 'Server error while fetching methods' });
  }
});


// GET /api/schemes  -> returns all PM Yojana documents
app.get('/api/schemes', async (req, res) => {
  try {
    const schemes = await Scheme.find().lean();
    res.status(200).json(schemes);
  } catch (err) {
    console.error('Error fetching schemes from DB:', err);
    res.status(500).json({ message: 'Server error while fetching schemes' });
  }
});

// (Optional, but good for viva) POST /api/schemes -> add a new scheme
app.post('/api/schemes', async (req, res) => {
  try {
    const body = req.body;
    const scheme = new Scheme(body);
    const saved = await scheme.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating scheme:', err);
    res.status(400).json({ message: 'Error creating scheme', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Schemes API running at http://localhost:${PORT}`);
});
