import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

const ignored = ["node_modules", ".git", ".env"];

function getFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter(item => !ignored.includes(item.name))
    .map(item => ({
      name: item.name,
      type: item.isDirectory() ? "folder" : "file",
      ...(item.isDirectory()
        ? { children: getFiles(path.join(directory, item.name)) }
        : {})
    }));
}

app.get("/", (req, res) => {
  res.json({
    message: "LifeLine Blood Donation Management System",
    status: "Running",
    directory: getFiles(__dirname)
  });
});

app.get("/api/health", (req, res) => {
  res.json({ message: "LifeLine API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Server error"
  });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});