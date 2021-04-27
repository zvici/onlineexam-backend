import { protect, admin } from '../middleware/authMiddleware.js'
import express from 'express'
import { getSubjects, getSubjectById, createSubject, UpdateSubject } from '../controllers/subjectController.js'

const router = express.Router()

router.route('/',admin).get(getSubjects);
router.route('/:id',admin).get(getSubjectById);
router.route('/', admin).post(createSubject);
router.route('/', admin).put(UpdateSubject);
export default router