import express from 'express'
const router = express.Router() 
import { getQuizz, getQuizzById, addQuizz, addQuestion, getQuestionByQuizzId, deleteQuizz, deleteQuestionById, getQuestionById,
    editQuizz, SetQuizzStarted, SetQuizzStopped, deleteAllQuestionByQuizzId } from '../controllers/quizzControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import {getResponseByQuizzId, getResponseByQuestionId} from '../controllers/reponseController.js'



//Quizz Routes
router.route('/').get(protect, admin, getQuizz).post(protect, admin, addQuizz)
router.route('/:id').get(protect,getQuizzById).delete(protect, admin, deleteQuizz).put(protect, admin, editQuizz)
router.route('/addquizz')
router.route('/:id/startquizz').put(protect, admin, SetQuizzStarted)
router.route('/:id/stopquizz').put(protect, admin, SetQuizzStopped)
router.route('/:id/results').get(protect, admin, getResponseByQuizzId)
router.route('/:id/results/:id').get(protect, admin, getResponseByQuestionId)




//Question Routes
router.route('/addquizz/:id/addquestion').put(protect, admin, addQuestion)
router.route('/:id/question').get(protect,  getQuestionByQuizzId)
router.route('/:id/deleteall').delete(protect, admin, deleteAllQuestionByQuizzId)
router.route('/:id/question/:id').delete(protect, admin, deleteQuestionById).get(protect, getQuestionById)




export default router