import express from 'express'
const router = express.Router() 
import { getQuizz, getQuizzById, addQuizz, addQuestion, getQuestionByQuizzId, deleteQuizz, deleteQuestionById, getQuestionById,
    editQuizz } from '../controllers/quizzControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'



//Quizz Routes
router.route('/').get(protect, admin, getQuizz).post(protect, admin, addQuizz)
router.route('/:id').get(protect, admin, getQuizzById).delete(protect, admin, deleteQuizz).put(protect, admin, editQuizz)
router.route('/addquizz')

//Question Routes
router.route('/addquizz/:id/addquestion').put(protect, admin, addQuestion)
router.route('/:id/question').get(protect, admin, getQuestionByQuizzId)
router.route('/:id/question/:id').delete(protect, admin, deleteQuestionById).get(protect, admin, getQuestionById)




export default router