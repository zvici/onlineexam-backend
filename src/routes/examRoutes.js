import { protect, admin } from '../middleware/authMiddleware.js'
import express from 'express'
import {
  createExams,
  getExams,
  getExamById,
  updateExamsById,
  deleteExamsById,
} from '../controllers/examController.js'

const router = express.Router()

router
  .route('/')
  .post(protect, admin, createExams)
  .get(getExams)
  .put(protect, admin, updateExamsById)
router.route('/:id').get(getExamById).delete(protect, admin, deleteExamsById)
export default router
