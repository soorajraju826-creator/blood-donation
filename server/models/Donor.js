import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  bloodGroup: { type: String, enum: ["A+","A-","B+","B-","AB+","AB-","O+","O-"], required: true },
  phone: { type: String, required: true, trim: true },
  district: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  available: { type: Boolean, default: true },
  lastDonation: { type: Date, default: null }
}, { timestamps: true });

export default mongoose.model("Donor", donorSchema);
