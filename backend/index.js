const express = require('express');
const cors = require('cors');
const connectToMongoDB = require('./db/connectDB');

const authRoutes = require('./routes/auth.route');

const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());


// CORS setup
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Connect to DB
connectToMongoDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
