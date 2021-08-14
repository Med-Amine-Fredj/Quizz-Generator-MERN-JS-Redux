import asyncHandler from 'express-async-handler'
import Quizz from '../models/quizzModel.js'
import Question from '../models/questionModel.js'
import Reponse from '../models/reponseModel.js'



// @desc Fetch Quizz By CodeQuizz
// @route GET /user/quizz/:id
// @acess Only User
const getQuizzByCode= asyncHandler(async(req,res) => {


    const quizz = await Quizz.findOne().where("codeQuizz", req.params.id)
  
    if (quizz) {
        res.json(quizz)
    } else {
        res.status(404)
        throw new Error('Quizz Not Found')
    }
})

 // @desc Add new response
// @route POST /reponse/:quizzid/question/questionid
// @acess Private /user
const addReponse = asyncHandler(async(req,res) => {
    const { idUtilisateur, idQuestion, idQuizz, tempsReponse, reponse} =  req.body
 
    const response = await Reponse.create({
        idUtilisateur,
        idQuestion,
        idQuizz,
        tempsReponse,
        reponse
    })


    if (response) {
        res.status(201).json({
            idUtilisateur,
            idQuestion,
            idQuizz,
            tempsReponse,
            reponse
        })
    } else {
        res.status(400)
        throw new Error('Invalid Reponse Data')
    }
 })

// @desc Fetch Response  By quizzId
// @route GET /admin/myquizz/:id/results
// @acess Only admin
const getResponseByQuizzId = asyncHandler(async(req,res) => {

    const quizzId = req.params.id

    const responses = await Reponse.find({}).where("idQuizz",quizzId)

    if (responses) {
        res.json(responses)
    } else {
        res.status(404)
        throw new Error('Quizz Not Found')
    }

})


// @desc Fetch Response  By quizzId
// @route GET /admin/myquizz/:id/results
// @acess Only admin
const getResponseByQuestionId = asyncHandler(async(req,res) => {

    const questionId = req.params.id

    const responses = await Reponse.find({}).where("idQuestion",questionId)

    if (responses) {
        res.json(responses)
    } else {
        res.status(404)
        throw new Error('Quizz Not Found')
    }
})


export {
    getQuizzByCode,
    addReponse,
    getResponseByQuizzId,
    getResponseByQuestionId,
}