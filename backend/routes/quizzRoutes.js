import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router() 
import Quizz from '../models/quizzModel.js'




// @desc Fetch All Quizz
// @route GET /admin/myquizz
// @acess Only admin
router.get('/', asyncHandler( async (req, res) => {
    const lesquizz = await Quizz.find({})
    res.json(lesquizz)
}))


// @desc Fetch Quizz By Id
// @route GET /admin/myquizz/:id
// @acess Only admin
router.get('/:id', asyncHandler ( async (req, res) => {
    const quizz = await Quizz.findById(req.params.id)
    if (quizz) {
        res.json(quizz)
    } else {
        res.status(404)
        throw new Error('Quizz Not Found')
    }
}))




export default router