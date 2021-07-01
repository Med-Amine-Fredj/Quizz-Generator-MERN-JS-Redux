import mongoose from 'mongoose'


const utilisateursSchema = mongoose.Schema({
    nomUtilisateur: {
        type : String,
        require: true,
    } ,
    emailUtilisateur: {
        type : String,
        require: true,
        unique: true,
    },
    mdp: {
            type : String,
            require: true,
    },
    isAdmin: {
        type : Boolean,
        require: true,
        default: false,
    },
    online: {
        type : Boolean,
        default: false,
    }   

}, {
    timestamps: true
})

const Utilisateurs = mongoose.model('Utilisateurs', utilisateursSchema) 

export default Utilisateurs