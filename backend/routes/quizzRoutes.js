import express from 'express'
const router = express.Router() 
import { getQuizz, getQuizzById, addQuizz, addQuestion, getQuestionByQuizzId, deleteQuizz, deleteQuestionById, getQuestionById } from '../controllers/quizzControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'



//Quizz Routes
router.route('/').get(protect, admin, getQuizz)
router.route('/:id').get(protect, admin, getQuizzById).delete(protect, admin, deleteQuizz)
router.route('/addquizz').put(protect, admin, addQuizz)

//Question Routes
router.route('/addquizz/:id/addquestion').put(protect, admin, addQuestion)
router.route('/:id/question').get(protect, admin, getQuestionByQuizzId)
router.route('/:id/question/:id').delete(protect, admin, deleteQuestionById).get(protect, admin, getQuestionById)




export default router