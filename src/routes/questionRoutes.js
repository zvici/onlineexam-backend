import { protect, admin } from '../middleware/authMiddleware.js'
import express from 'express'
import { createQuestions, getQuestions, getQuestionsByChapter } from '../controllers/questionController.js'

const router = express.Router()

router.route('/').post(protect, admin, createQuestions).get(getQuestions)
router.route('/chapter/:id/').get(getQuestionsByChapter)


export default router