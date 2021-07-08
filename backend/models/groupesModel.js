import mongoose from 'mongoose'





const groupeSchema = mongoose.Schema({


    nomMembres: {
        type: Array,
        require: true,
    },
    emailMembres: {
        type: Array,
        require: true,
    },
    nomGroupe: {
        type : String,
        require: true,
        unique: true,
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