import mongoose from 'mongoose'


const quizzSchema = mongoose.Schema({
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Utilisateurs'
    },
    nomQuizz: {
        type : String,
        require: true,
    } ,
    descriptionQuizz: {
        type : String,
        require: true,
    },
    imageQuizz: { 
        type : String,
        require: true,
    },
    activation: {
        type : String,
        default: false,
    },
    codeQuizz: {
        type : Number,
        require: true,
        default: 0,
    }  

}, {
    timestamps: true
})

const Quizz = mongoose.model('Quizz', quizzSchema) 

export default Quizz