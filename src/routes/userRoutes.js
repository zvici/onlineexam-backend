import { authUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import express from 'express'

const router = express.Router()

// router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
// router
//   .route('/profile')
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile)
// router
//   .route('/:id')
//   .delete(protect, admin, deleteUser)
//   .get(protect, admin, getUserById)
//   .put(protect, admin, updateUser)

export default router
