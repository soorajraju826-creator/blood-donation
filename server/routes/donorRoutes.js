import { Router } from "express";
import { createOrUpdateDonor, searchDonors, myDonorProfile } from "../controllers/donorController.js";
import { protect } from "../middleware/auth.js";
const router = Router();
router.get("/", searchDonors);
router.get("/me", protect, myDonorProfile);
router.post("/", protect, createOrUpdateDonor);
export default router;
