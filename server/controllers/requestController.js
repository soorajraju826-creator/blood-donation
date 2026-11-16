import BloodRequest from "../models/BloodRequest.js";

export async function createRequest(req, res, next) {
  try {
    const { patientName, bloodGroup, units, hospital, district, contactPhone, neededBy, details } = req.body;
    if (!patientName || !bloodGroup || !units || !hospital || !district || !contactPhone || !neededBy)
      return res.status(400).json({ message: "Please complete all required request details" });
    const request = await BloodRequest.create({ requester: req.user._id, patientName, bloodGroup, units, hospital, district, contactPhone, neededBy, details });
    res.status(201).json({ request });
  } catch (error) { next(error); }
}

export async function myRequests(req, res, next) {
  try {
    const requests = await BloodRequest.find({ requester: req.user._id }).sort({ createdAt: -1 });
    res.json({ requests });
  } catch (error) { next(error); }
}
