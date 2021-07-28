import express from 'express'
const router = express.Router() 
import { protect, admin } from '../middleware/authMiddleware.js'
import {getQuizzByCode,addReponse} from '../controllers/reponseController.js'



router.route('/:id').get(protect, getQuizzByCode)
router.route('/:id/question/:id/addreponse').post(protect, addReponse)





export default router   