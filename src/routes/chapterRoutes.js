import { protect, admin } from "../middleware/authMiddleware.js";
import express from "express";
import {
  getChapters,
  getChaptersById,
  createChapters,
  updateChapter,
  deleteChapter,
} from "../controllers/chapterController.js";

const router = express.Router();

router
  .route("/", admin)
  .get(getChapters)
  .post(createChapters)
  .put(updateChapter)
  .delete(deleteChapter);
router.route("/:id", admin).get(getChaptersById);
export default router;
