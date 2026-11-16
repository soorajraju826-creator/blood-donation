import { Router } from "express";
import { createRequest, myRequests } from "../controllers/requestController.js";
import { protect } from "../middleware/auth.js";
const router = Router();
router.use(protect);
router.post("/", createRequest);
router.get("/mine", myRequests);
export default router;
