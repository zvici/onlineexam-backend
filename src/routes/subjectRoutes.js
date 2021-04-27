import { protect, admin } from "../middleware/authMiddleware.js";
import express from "express";
import {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../controllers/subjectController.js";

const router = express.Router();

router
  .route("/", admin)
  .get(getSubjects)
  .post(createSubject)
  .put(updateSubject)
  .delete(deleteSubject);
router.route("/:id", admin).get(getSubjectById);
export default router;
