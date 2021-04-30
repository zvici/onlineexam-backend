import { protect, admin } from '../middleware/authMiddleware.js'
import express from 'express'
import { getQuestions } from '../controllers/questionController.js'
import { getChaptersById } from '../controllers/chapterController.js'

const router = express.Router()

router.route("/", admin).get(getQuestions)
router.route("/:id", admin).get(getChaptersById);

export default router