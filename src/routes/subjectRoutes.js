import { protect, admin } from '../middleware/authMiddleware.js'
import express from 'express'
import { getSubjects, getSubjectById } from '../controllers/subjectController.js'

const router = express.Router()

router.route('/',admin).get(getSubjects);
router.route('/:id',admin).get(getSubjectById);
export default router