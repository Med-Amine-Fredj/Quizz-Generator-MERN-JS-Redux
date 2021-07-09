import mongoose from 'mongoose'

const questionSchema = mongoose.Schema({
    quizzId: {
        type: String,
        require: true,
    },
    typeQuestion: {
        type : String,
        require: true,
    },
    titreQuestion: {
        type : String,
        require: true,
    },
    tempsQuestion: {
        type : String,
        require: true,
    },
    choixQuestion: {
        type: Array,
        require: true,
    },
    reponseQuestion: {
        type: Array,
        require: true,
    },
   
}, {
    timestamps: true
})

const Question = mongoose.model('Question', questionSchema) 

export default Question