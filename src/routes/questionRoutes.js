import { protect, admin } from "../middleware/authMiddleware.js";
import express from "express";
import {
  createQuestions,
  getQuestions,
  getQuestionById,
  getQuestionsByChapter,
  updateQuestionsById,
  deleteQuestionsById,
  importQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

router
  .route("/")
  .post(protect, admin, createQuestions)
  .get(getQuestions)
  .put(protect, admin, updateQuestionsById);
router.route("/chapter/:id/").get(protect, admin, getQuestionsByChapter);
router.route('/import').post(protect, admin, importQuestion);
router.route("/:id").get(getQuestionById).delete(protect, admin, deleteQuestionsById);
export default router;
