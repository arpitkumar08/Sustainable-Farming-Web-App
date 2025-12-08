const express = require('express');
const cors = require('cors');
const connectToMongoDB = require('./db/connectDB');

const authRoutes = require('./routes/auth.route');

const weatherRoutes = require("./routes/weatherRoutes");
const soilRoutes = require("./routes/soilRoutes");

const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/soil", soilRoutes);

connectToMongoDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
