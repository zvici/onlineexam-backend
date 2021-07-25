import {
  authUser,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  importUser,
  updateUserPassword,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import express from 'express'

const router = express.Router()

router.route('/').get(protect, admin, getUsers).post(protect, admin, createUser)
router.route('/import').post(protect, admin, importUser)
router.post('/login', authUser)
// router
//   .route('/profile')
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
router
  .route('/password/:id')
  .put(protect, admin, updateUserPassword)

export default router
