import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  patientName: { type: String, required: true, trim: true },
  bloodGroup: { type: String, enum: ["A+","A-","B+","B-","AB+","AB-","O+","O-"], required: true },
  units: { type: Number, required: true, min: 1, max: 10 },
  hospital: { type: String, required: true, trim: true },
  district: { type: String, required: true, trim: true },
  contactPhone: { type: String, required: true, trim: true },
  neededBy: { type: Date, required: true },
  details: { type: String, default: "", maxlength: 500 },
  status: { type: String, enum: ["pending","approved","rejected","completed"], default: "pending" }
}, { timestamps: true });

export default mongoose.model("BloodRequest", requestSchema);
