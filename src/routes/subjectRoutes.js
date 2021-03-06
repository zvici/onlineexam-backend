import { protect, admin } from '../middleware/authMiddleware.js'
import express from 'express'
import {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
  getAllSubjects,
} from '../controllers/subjectController.js'

const router = express.Router()

router.route('/', admin).get(getSubjects).post(createSubject)
router.route('/all', admin).get(getAllSubjects)
router
  .route('/:id')
  .get(getSubjectById)
  .delete(protect, admin, deleteSubject)
  .put(protect, admin, updateSubject)

export default router
