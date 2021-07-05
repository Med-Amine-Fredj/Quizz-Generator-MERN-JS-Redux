import express from 'express'
const router = express.Router() 
import { authUser, getUserProfile, updateUserProfile, getAllUsers, deleteUser, getUserById, updateUser, addUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'



router.route('/').get(protect, admin, getAllUsers)

router.post('/login', authUser)

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)

router.route('/adduser').post(protect, admin, addUser)


export default router