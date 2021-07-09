import mongoose from 'mongoose'


const quizzSchema = mongoose.Schema({
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
        default: "noncommencer",
    },
    codeQuizz: {
        type : Number,
        require: true,
        unique: true,
        default: 0,
    }  

}, {
    timestamps: true
})

const Quizz = mongoose.model('Quizz', quizzSchema) 

export default Quizz