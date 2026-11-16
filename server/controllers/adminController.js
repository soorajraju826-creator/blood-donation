import User from "../models/User.js";
import Donor from "../models/Donor.js";
import BloodRequest from "../models/BloodRequest.js";

export async function dashboard(req, res, next) {
  try {
    const [users, donors, requests, pending, approved] = await Promise.all([
      User.countDocuments({ role: "user" }), Donor.countDocuments(), BloodRequest.countDocuments(),
      BloodRequest.countDocuments({ status: "pending" }), BloodRequest.countDocuments({ status: "approved" })
    ]);
    res.json({ stats: { users, donors, requests, pending, approved } });
  } catch (error) { next(error); }
}

export async function listUsers(req, res, next) {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) { next(error); }
}

export async function listDonors(req, res, next) {
  try {
    const donors = await Donor.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json({ donors });
  } catch (error) { next(error); }
}

export async function listRequests(req, res, next) {
  try {
    const requests = await BloodRequest.find().populate("requester", "name email").sort({ createdAt: -1 });
    res.json({ requests });
  } catch (error) { next(error); }
}

export async function updateRequestStatus(req, res, next) {
  try {
    const allowed = ["pending", "approved", "rejected", "completed"];
    if (!allowed.includes(req.body.status)) return res.status(400).json({ message: "Invalid status" });
    const request = await BloodRequest.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json({ request });
  } catch (error) { next(error); }
}

export async function deleteUser(req, res, next) {
  try {
    if (String(req.user._id) === req.params.id) return res.status(400).json({ message: "You cannot delete your own admin account" });
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await Promise.all([
      User.findByIdAndDelete(req.params.id),
      Donor.findOneAndDelete({ user: req.params.id }),
      BloodRequest.deleteMany({ requester: req.params.id })
    ]);
    res.json({ message: "User and related records deleted" });
  } catch (error) { next(error); }
}
