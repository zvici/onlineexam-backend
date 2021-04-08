import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUserProfile,
  passwordRetrieval,
  changePasswordFromEmail,
  checkPasswordRetrieval,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import cors from "cors";
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/password-retrieval", cors(), passwordRetrieval);
router.post("/change-password-from-email", changePasswordFromEmail);
router.post("/check-password-retrieval", checkPasswordRetrieval);
router.route("/").get(protect, getAllUserProfile);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
