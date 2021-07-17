import { protect, admin } from "../middleware/authMiddleware.js";
import express from "express";
import {
  createSchedules,
  getSchedules,
  getScheduleById,
  updateSchedulesById,
  deleteSchedulesById,
  getSchedulesByAttendants,
  getAllSchedules,
} from "../controllers/scheduleController.js";

const router = express.Router();

router
  .route("/")
  .post(protect, admin, createSchedules)
  .get(getSchedules)
  .put(protect, admin, updateSchedulesById);
router.route("/attendants/:id").get(getSchedulesByAttendants);
router.route("/all").get(getAllSchedules);
router
  .route("/:id")
  .get(getScheduleById)
  .delete(protect, admin, deleteSchedulesById);
export default router;
