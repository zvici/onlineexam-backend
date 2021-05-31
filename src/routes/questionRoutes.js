import { protect, admin } from "../middleware/authMiddleware.js";
import express from "express";
import {
  createQuestions,
  getQuestions,
  getQuestionById,
  getQuestionsByChapter,
  updateQuestionsById,
  deleteQuestionsById,
} from "../controllers/questionController.js";

const router = express.Router();

router
  .route("/")
  .post(protect, admin, createQuestions)
  .get(protect, admin, getQuestions)
  .put(protect, admin, updateQuestionsById)
  .delete(protect, admin, deleteQuestionsById);
router.route("/chapter/:id/").get(protect, admin, getQuestionsByChapter);
router.route("/:id").get(protect, admin, getQuestionById);
export default router;
