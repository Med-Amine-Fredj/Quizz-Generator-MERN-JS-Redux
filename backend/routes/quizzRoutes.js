import express from 'express'
const router = express.Router() 
import { getQuizz, getQuizzById } from '../controllers/quizzControllers.js'




router.route('/').get(getQuizz)
router.route('/:id').get(getQuizzById)




export default router