import { protect, admin } from '../middleware/authMiddleware.js'
import express from 'express'
import {
  createSchedules,
  getSchedules,
  getScheduleById,
  updateSchedulesById,
  deleteSchedulesById,
} from '../controllers/scheduleController.js'

const router = express.Router()

router
  .route('/')
  .post(protect, admin, createSchedules)
  .get(getSchedules)
  .put(protect, admin, updateSchedulesById)
router
  .route('/:id')
  .get(getScheduleById)
  .delete(protect, admin, deleteSchedulesById)
export default router
