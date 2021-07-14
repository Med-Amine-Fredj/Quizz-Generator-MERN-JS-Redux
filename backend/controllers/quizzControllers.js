import asyncHandler from 'express-async-handler'
import Quizz from '../models/quizzModel.js'
import Question from '../models/questionModel.js'



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

// @desc Add new quizz 
// @route POST /admin/myquizz/addquizz
// @acess Private /admin
const addQuizz = asyncHandler(async(req,res) => {

    const codeQuizz = Math.floor(Math.random() * 100000) + 1

    const activation = "noncommencer"

    const quizz = new Quizz({
        nomQuizz: 'sample name',
        descriptionQuizz: 'sample description',
        imageQuizz: '/images/sample.jpg',
        activation,
        codeQuizz
    })
    
    const createdQuizz = await quizz.save()
    res.status(201).json(createdQuizz)
 })

 // @desc Edit quizz 
// @route PUT /admin/myquizz/:id
// @acess Private /admin
const editQuizz = asyncHandler(async(req,res) => {
    const { nomQuizz, descriptionQuizz, imageQuizz } = req.body
    
    const quizz = await Quizz.findById(req.params.id)

    if(quizz) {
        quizz.nomQuizz = nomQuizz
        quizz.descriptionQuizz = descriptionQuizz
        quizz.imageQuizz = imageQuizz
    }else {
        res.status(404)
        throw new Error('Quizz Not Found !')
    }

    const updatedQuizz = await quizz.save()
    res.json(updatedQuizz)
 })

// @desc Add new question
// @route POST /admin/myquizz/addquizz/:id/addQuestion
// @acess Private /admin
const addQuestion = asyncHandler(async(req,res) => {

    const quizzId =  req.params.id

    const { titreQuestion, typeQuestion, tempsQuestion, choixQuestion, reponseQuestion } =  req.body

    const quizz = await Quizz.findById(quizzId)

    if(quizz) {

        const question = await Question.create({
            quizzId,
            titreQuestion,
            typeQuestion,
            tempsQuestion,
            choixQuestion,
            reponseQuestion
        })
    
        if (question) {
            res.status(201).json({
                _id: question._id,
                quizzId : question.quizzId,
                titreQuestion: question.titreQuestion,
                typeQuestion: question.typeQuestion, 
                choixQuestion: question.choixQuestion, 
                reponseQuestion: question.reponseQuestion, 
                tempsQuestion: question.tempsQuestion, 
            })
        } else {
            res.status(400)
            throw new Error('Invalid Question Data')
        }
    } else {
        res.status(400)
        throw new Error('Quizz Not Foind ! ')
    }

  
 })


// @desc Fetch Question By quizzId
// @route GET /admin/myquizz/:id
// @acess Only admin
const getQuestionByQuizzId = asyncHandler(async(req,res) => {

    const quizzId = req.params.id

    const questin = await Question.find({}).where("quizzId",quizzId)

    if (questin) {
        res.json(questin)
    } else {
        res.status(404)
        throw new Error('Quizz Not Found')
    }

})


// @desc Delete Quizz
// @route DELETE /admin/myquizz/:id
// @acess Private /admin
const deleteQuizz = asyncHandler(async(req,res) => {
    const quizzId = req.params.id
    const quizz = await Quizz.findById(quizzId)
    if (quizz) {
            await Question.deleteMany({quizzId: quizzId})
            await quizz.remove()

            res.json({
                message: 'Quizz Removed ! '
            })

    } else {
        res.status(404)
        throw new Error('Quizz Not Found !')
    }
 })
 // @desc Delete Question By Id
// @route DELETE /admin/myquizz/:id/question/:id
// @acess Private /admin
const deleteQuestionById = asyncHandler(async(req,res) => {

    const question = await Question.findById(req.params.id)
    if (question) {
            await question.remove()
            res.json({
                message: 'Question Removed ! '
            })

    } else {
        res.status(404)
        throw new Error('Question Not Found !')
    }
 })


 // @desc Fetch Question By Id
// @route GET /admin/myquizz/:id/question/:id
// @acess Only admin
const getQuestionById = asyncHandler(async(req,res) => {

    const question = await Question.findById(req.params.id)
    if (question) {
        res.json(question)
    } else {
        res.status(404)
        throw new Error('Question Not Found')
    }
})

// @desc Start Quizz
// @route PUT /admin/myquizz/:id/startquizz
// @acess Only admin
const SetQuizzStarted = asyncHandler(async(req,res) => {

    const id = req.body.id
    const quizz = await Quizz.findById(id)
    if (quizz) {
        if(quizz.activation ==='encours' || quizz.activation ==='finis') {
            res.status(404)
            throw new Error('Quizz Already Started Or Finished')
        } else {
            quizz.activation = 'encours'
            const updatedQuizz = await quizz.save()
            res.json(updatedQuizz)
        }

    } else {
        res.status(404)
        throw new Error('Quizz Not Found')
    }
})

// @desc Stop Quizz
// @route PUT /admin/myquizz/:id/stopquizz
// @acess Only admin
const SetQuizzStopped = asyncHandler(async(req,res) => {

    const id = req.body.id
    const quizz = await Quizz.findById(id)
    if (quizz) {
        if(quizz.activation ==='noncommencer' || quizz.activation ==='finis') {
            res.status(404)
            throw new Error('Quizz Already Finished Or Not Even Started')
        } else {
            quizz.activation = 'finis'
            const updatedQuizz = await quizz.save()
            res.json(updatedQuizz)
        }

    } else {
        res.status(404)
        throw new Error('Quizz Not Found')
    }
})

// @desc Delete  All Question By QuizzId
// @route DELETE /admin/myquizz/:id/deleteall
// @acess Private /admin
const deleteAllQuestionByQuizzId = asyncHandler(async(req,res) => {
    const quizzId = req.params.id
    const quizz = await Quizz.findById(quizzId)
    if (quizz) {
            await Question.deleteMany({quizzId: quizzId})
            res.json({
                message: 'All Questions Removed ! '
            })

    } else {
        res.status(404)
        throw new Error('Quizz Not Found !')
    }
 })


export {
    getQuizz,
    getQuizzById,
    addQuizz,
    addQuestion,
    getQuestionByQuizzId,
    deleteQuizz,
    deleteQuestionById,
    getQuestionById,
    editQuizz,
    SetQuizzStarted,
    SetQuizzStopped,
    deleteAllQuestionByQuizzId,
}