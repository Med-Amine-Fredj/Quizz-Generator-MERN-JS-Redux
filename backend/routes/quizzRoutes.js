import express from 'express'
const router = express.Router() 
import { getQuizz, getQuizzById } from '../controllers/quizzControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'




router.route('/').get(protect, admin, getQuizz)
router.route('/:id').get(protect, admin, getQuizzById)




export default router