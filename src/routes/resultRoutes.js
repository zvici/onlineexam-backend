import { protect, admin } from "../middleware/authMiddleware.js";
import express from "express";
import { addResult, getAllResults, getResultByUser, getResults } from "../controllers/resultController.js";

const router = express.Router();

router.route("/").post(addResult);
router.route("/user/:id").get(getResultByUser);
router.route("/schedule/:id").get(getResults);
router.route("/schedule/all/:id").get(getAllResults);
export default router;
