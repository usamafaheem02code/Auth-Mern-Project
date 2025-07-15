import express from "express";
import cors from "cors";
import authRoutes from "./Routes/AuthRoutes.js";  // your router file
import userConfig from "./Model/db.js";           // mongoose connection

const app = express();
const PORT = 8000;

// Connect to MongoDB
userConfig();

// Middlewares
app.use(cors());             // Allow all origins - important for frontend calls
app.use(express.json());     // Parse JSON body

// Routes
app.use("/auth", authRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
