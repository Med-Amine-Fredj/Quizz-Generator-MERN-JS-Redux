import asyncHandler from 'express-async-handler'
import Utilisateurs from '../models/utilisateurModel.js'
import generateToken from '../utils/generateToken.js'




// @desc Auth User & get token 
// @route POST /users/login
// @acess Public
const authUser = asyncHandler(async(req,res) => {
   const { emailUtilisateur, mdp } =  req.body

   const user = await Utilisateurs.findOne({ emailUtilisateur })

   if (user && (await user.matchMdp(mdp))) {
       res.json({
           _id: user._id,
           nomUtilisateur : user.nomUtilisateur,
           emailUtilisateur: user.emailUtilisateur,
           isAdmin: user.isAdmin,
           token: generateToken(user._id),
           online: true,
       })
   } else {
       res.status(401)
       throw new Error('Invalid Email or Password !')
   }
})



// @desc GET user profile
// @route GET /users/profile
// @acess Private 
const getUserProfile = asyncHandler(async(req,res) => {
    const user = await Utilisateurs.findById(req.user._id)

    if(user) {
        res.json({
            _id: user._id,
            nomUtilisateur : user.nomUtilisateur,
            emailUtilisateur: user.emailUtilisateur,
            isAdmin: user.isAdmin,
            online: true,
        })
    } else {
        res.status(404)
        throw new Error('User Not Found ! ')
    }
 })



export  { authUser, getUserProfile }