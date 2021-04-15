import express from "express";
import { getAllQuestions } from "../controllers/questionsController.js";

import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(protect, getAllQuestions);

export default router;
