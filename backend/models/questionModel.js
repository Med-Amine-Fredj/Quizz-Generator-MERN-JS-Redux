import mongoose from 'mongoose'

const choixQuestionSchema = mongoose.Schema({
    choix1: { type: String, require:true, },
    choix2: { type: String, require:true, },
    choix3: { type: String, },
    choix4: { type: String, },
    choix5: { type: String, },
})

const reponseQuestionSchema = mongoose.Schema({
    reponse1: { type: String, require:true, },
    reponse2: { type: String, },
    reponse3: { type: String, },
    reponse4: { type: String, },
    reponse5: { type: String, },
})

const questionSchema = mongoose.Schema({
    quizzId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Quizz'
    },
    typeQuestion: {
        type : String,
        require: true,
    } ,
    titreQuestion: {
        type : String,
        require: true,
    },
    choixQuestion: [choixQuestionSchema],
    reponseQuestion: [reponseQuestionSchema],
   
}, {
    timestamps: true
})

const Question = mongoose.model('Question', questionSchema) 

export default Question