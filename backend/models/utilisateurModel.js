import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


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

utilisateursSchema.methods.matchMdp = async function(enterdedPassword) {
    return await bcrypt.compare(enterdedPassword, this.mdp)
}

utilisateursSchema.pre('save', async function (next) {
    if (!this.isModified('mdp')) {
      next()
    }
    const salt = await bcrypt.genSalt(10)
    this.mdp = await bcrypt.hash(this.mdp, salt)
  })
const Utilisateurs = mongoose.model('Utilisateurs', utilisateursSchema) 

export default Utilisateurs