import mongoose from 'mongoose'



const lesUtilisateursSchema = mongoose.Schema({
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Utilisateurs'
    },
})

const groupeSchema = mongoose.Schema({

    lesUtilisateur: [lesUtilisateursSchema],
    nomGroupe: {
        type : String,
        require: true,
    } ,
    descriptionGroupe: {
        type : String,
        require: true,
    },
}, {
    timestamps: true
})

const Groupe = mongoose.model('Groupe', groupeSchema) 

export default Groupe