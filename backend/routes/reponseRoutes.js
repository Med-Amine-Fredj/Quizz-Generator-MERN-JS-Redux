import express from 'express'
const router = express.Router() 
import { protect, admin } from '../middleware/authMiddleware.js'
import {getQuizzByCode} from '../controllers/reponseController.js'



router.route('/:id').get(protect, getQuizzByCode)



export default router   