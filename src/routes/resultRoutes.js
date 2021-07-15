import { protect, admin } from "../middleware/authMiddleware.js";
import express from "express";
import { addResult, getResultByUser } from "../controllers/resultController.js";

const router = express.Router();

router.route("/").post(addResult);
router.route("/user/:id").get(getResultByUser)
export default router;
