import mongoose from 'mongoose'


const reponseSchema = mongoose.Schema({

    idUtilisateur: {
        type: String,
        require: true,
    },
    idQuestion: {
        type: String,
        require: true,
    },
    idQuizz: {
        type: String,
        require: true,
    },
    tempsReponse: {
        type: Number,
        require: true,
    },
    reponse: {
        type: Array,
        require: true,
    },
}, {
    timestamps: true
})

const Reponse = mongoose.model('Reponse', reponseSchema) 

export default Reponse