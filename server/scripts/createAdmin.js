import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();
async function run() {
  try {
    const { MONGO_URI, ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    if (!MONGO_URI || !process.env.JWT_SECRET || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error("Set MONGO_URI, JWT_SECRET, ADMIN_EMAIL and ADMIN_PASSWORD in server/.env");
    }
    if (ADMIN_PASSWORD.length < 8) throw new Error("ADMIN_PASSWORD must be at least 8 characters");
    await mongoose.connect(MONGO_URI);
    const email = ADMIN_EMAIL.toLowerCase().trim();
    const password = await bcrypt.hash(ADMIN_PASSWORD, 12);
    const existing = await User.findOne({ email }).select("+password");
    if (existing) {
      existing.name = ADMIN_NAME || existing.name;
      existing.password = password;
      existing.role = "admin";
      await existing.save();
      console.log(`Existing account ${email} updated as admin.`);
    } else {
      await User.create({ name: ADMIN_NAME || "Administrator", email, password, role: "admin" });
      console.log(`Admin account ${email} created successfully.`);
    }
    console.log("You can now sign in through the normal /login page.");
  } catch (error) {
    console.error("Admin setup failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}
run();
