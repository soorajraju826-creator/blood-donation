import Donor from "../models/Donor.js";

export async function createOrUpdateDonor(req, res, next) {
  try {
    const { bloodGroup, phone, district, city, lastDonation } = req.body;
    if (!bloodGroup || !phone || !district || !city) return res.status(400).json({ message: "Please complete all required donor details" });
    const donor = await Donor.findOneAndUpdate(
      { user: req.user._id },
      { user: req.user._id, bloodGroup, phone, district, city, lastDonation: lastDonation || null },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(201).json({ donor });
  } catch (error) { next(error); }
}

export async function searchDonors(req, res, next) {
  try {
    const filter = { available: true };
    if (req.query.bloodGroup) filter.bloodGroup = req.query.bloodGroup;
    if (req.query.district) filter.district = new RegExp(req.query.district, "i");
    const donors = await Donor.find(filter).populate("user", "name").sort({ createdAt: -1 });
    res.json({ donors });
  } catch (error) { next(error); }
}

export async function myDonorProfile(req, res, next) {
  try {
    const donor = await Donor.findOne({ user: req.user._id });
    res.json({ donor });
  } catch (error) { next(error); }
}
