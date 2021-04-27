import { protect, admin } from '../middleware/authMiddleware.js'
import express from 'express'
import { getSubjects, getSubjectById, createSubject } from '../controllers/subjectController.js'

const router = express.Router()

router.route('/',admin).get(getSubjects);
router.route('/:id',admin).get(getSubjectById);
router.route('/', admin).post(createSubject);
export default router