import asyncHandler from 'express-async-handler'
import Quizz from '../models/quizzModel.js'



// @desc Fetch All Quizz
// @route GET /admin/myquizz
// @acess Only admin
const getQuizz = asyncHandler(async(req,res) => {

    const lesquizz = await Quizz.find({})
    res.json(lesquizz)

})


// @desc Fetch Quizz By Id
// @route GET /admin/myquizz/:id
// @acess Only admin
const getQuizzById = asyncHandler(async(req,res) => {

    const quizz = await Quizz.findById(req.params.id)
    if (quizz) {
        res.json(quizz)
    } else {
        res.status(404)
        throw new Error('Quizz Not Found')
    }

})

export {
    getQuizz,
    getQuizzById
}