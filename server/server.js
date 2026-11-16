import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>LifeLine API Server</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 40px;
          color: #333;
          line-height: 1.6;
        }
        h1 {
          font-size: 2em;
          font-weight: normal;
          margin-bottom: 25px;
        }
        h2 {
          font-size: 1.5em;
          font-weight: normal;
          margin-top: 30px;
        }
        code {
          background: #f3f3f3;
          padding: 4px 7px;
          border-radius: 3px;
          margin-right: 5px;
        }
        a {
          color: #2484c6;
        }
        @media(max-width: 600px) {
          body {
            margin: 20px;
          }
        }
      </style>
    </head>
    <body>
      <h1>LifeLine API Server</h1>

      <h2>Congrats!</h2>

      <p>You're successfully running LifeLine Blood Donation Management API</p>

      <p>✧*｡٩(ˊᗜˋ*)و✧*｡</p>

      <p>To access and modify resources, you can use any HTTP method:</p>

      <p>
        <code>GET</code>
        <code>POST</code>
        <code>PUT</code>
        <code>PATCH</code>
        <code>DELETE</code>
        <code>OPTIONS</code>
      </p>

      <h2>Resources</h2>

      <ul>
        <li><a href="/api/health">Health</a></li>
        <li><a href="/api/auth">Authentication</a></li>
        <li><a href="/api/donors">Donors</a></li>
        <li><a href="/api/requests">Blood Requests</a></li>
        <li><a href="/api/admin">Admin</a></li>
      </ul>

      <h2>Documentation</h2>

      <p>LifeLine Blood Donation Management System API</p>
    </body>
    </html>
  `);
});

app.get("/api/health", (req, res) => {
  res.json({
    message: "LifeLine API is running",
    status: "success"
  });
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

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });