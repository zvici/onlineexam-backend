import { protect, admin } from "../middleware/authMiddleware.js";
import express from "express";
import { addResult } from "../controllers/resultController.js";

const router = express.Router();

router.route("/").post(addResult);

export default router;
