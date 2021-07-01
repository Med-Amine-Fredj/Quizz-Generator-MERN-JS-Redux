import mongoose from 'mongoose'


const detailsReponseSchema = mongoose.Schema({
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Utilisateurs'
    },
    tempsReponse: {
        type: Number,
        require: true,
    },
    groupe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Groupe'
    },
    reponse: [
        {
            reponseCondidat1: { type: String, require:true, },
            reponseCondidat2: { type: String, },
            reponseCondidat3: { type: String, },
            reponseCondidat4: { type: String, },
            reponseCondidat5: { type: String, }, 
        }
            ],
}, {
    timestamps: true
})

const reponseSchema = mongoose.Schema({

    question: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Question'
    },
    detailsReponse: [detailsReponseSchema],
}, {
    timestamps: true
})

const Reponse = mongoose.model('Reponse', reponseSchema) 

export default Reponse