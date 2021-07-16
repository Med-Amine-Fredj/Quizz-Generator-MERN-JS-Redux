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



export {
    getQuizzByCode
}