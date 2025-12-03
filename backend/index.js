const express = require('express');
const connectToMongoDB = require('./db/connectDB');

const authRoutes = require('./routes/auth.route');

const app = express();

// Middleware (optional for JSON)
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Connect to DB
connectToMongoDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
