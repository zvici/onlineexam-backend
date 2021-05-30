import { protect, admin } from '../middleware/authMiddleware.js'
import express from 'express'
import { createQuestions, getQuestions } from '../controllers/questionController.js'

const router = express.Router()

router.route('/').post(protect, admin, createQuestions).get(getQuestions)

export default router