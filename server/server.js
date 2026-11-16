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

const resources = [
  { name: "Authentication", path: "/api/auth" },
  { name: "Donors", path: "/api/donors" },
  { name: "Blood Requests", path: "/api/requests" },
  { name: "Admin", path: "/api/admin" },
  { name: "Health", path: "/api/health" }
];

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>LifeLine API Server</title>
      <style>
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          color: #454b55;
          background: #ffffff;
        }
        header {
          height: 70px;
          border-bottom: 1px solid #eeeeee;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 25px;
        }
        header h3 {
          color: #303640;
          font-size: 18px;
        }
        header span {
          color: #777;
          font-size: 13px;
        }
        main {
          max-width: 1000px;
          margin: 65px auto;
          padding: 0 25px;
        }
        h1 {
          font-size: 29px;
          font-weight: 400;
          margin-bottom: 12px;
        }
        h2 {
          font-size: 25px;
          font-weight: 400;
          margin-top: 65px;
          margin-bottom: 22px;
        }
        p {
          font-size: 14px;
          line-height: 1.7;
        }
        .success {
          color: #24945d;
          font-weight: 600;
        }
        .resource {
          margin: 18px 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        a {
          color: #607f9e;
          font-size: 14px;
          text-decoration: underline;
        }
        a:hover {
          color: #245b91;
        }
        .method {
          font-size: 11px;
          background: #edf0f4;
          padding: 4px 7px;
          border-radius: 3px;
          color: #515b69;
        }
        .info {
          margin-top: 35px;
          padding: 18px;
          background: #f7f8fa;
          border: 1px solid #eeeeee;
          border-radius: 5px;
          font-size: 13px;
        }
        footer {
          border-top: 1px solid #eeeeee;
          padding: 25px;
          text-align: center;
          color: #888;
          font-size: 12px;
          margin-top: 100px;
        }
        @media(max-width: 600px) {
          main {
            margin: 40px auto;
          }
          header {
            padding: 0 15px;
          }
          h1 {
            font-size: 25px;
          }
        }
      </style>
    </head>
    <body>
      <header>
        <h3>🩸 LifeLine API Server</h3>
        <span>Blood Donation Management System</span>
      </header>

      <main>
        <h1>Congratulations!</h1>
        <p>You're successfully running LifeLine API Server.</p>
        <p class="success">✓ Server is running successfully</p>

        <h2>Resources</h2>

        ${resources.map(resource => `
          <div class="resource">
            <a href="${resource.path}">${resource.path}</a>
            <span>${resource.name}</span>
          </div>
        `).join("")}

        <p>To access and modify resources, you can use the following HTTP methods:</p>

        <p>
          <span class="method">GET</span>
          <span class="method">POST</span>
          <span class="method">PUT</span>
          <span class="method">PATCH</span>
          <span class="method">DELETE</span>
        </p>

        <div class="info">
          <strong>API Base URL:</strong><br>
          ${req.protocol}://${req.get("host")}
        </div>

        <h2>Documentation</h2>
        <p>LifeLine Blood Donation Management API</p>
      </main>

      <footer>
        LifeLine Blood Donation Management System © 2026
      </footer>
    </body>
    </html>
  `);
});

app.get("/api/health", (req, res) => {
  res.json({ message: "LifeLine API is running", status: "success" });
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
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error("Database connection failed:", error);
  process.exit(1);
});