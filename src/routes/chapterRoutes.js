import { protect, admin } from '../middleware/authMiddleware.js'
import express from 'express'
import {
  getChapters,
  getChaptersById,
  createChapters,
  updateChapter,
  deleteChapter,
  getChaptersBySubject,
} from '../controllers/chapterController.js'

const router = express.Router()

router.route('/', admin).get(getChapters).post(protect, admin, createChapters)
router
  .route('/:id')
  .get(getChaptersById)
  .put(protect, admin, updateChapter)
  .delete(protect, admin, deleteChapter)
router.route('/subject/:id/').get(getChaptersBySubject)
export default router
