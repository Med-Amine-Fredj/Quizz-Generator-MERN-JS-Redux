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


 // @desc Update user profile
// @route PUT /users/profile
// @acess Private 
const updateUserProfile = asyncHandler(async(req,res) => {
    const user = await Utilisateurs.findById(req.user._id)

    if(user) {
        user.nomUtilisateur = req.body.nomUtilisateur || user.nomUtilisateur

        user.emailUtilisateur = req.body.emailUtilisateur || user.emailUtilisateur

        if ( req.body.mdp) {
            user.mdp = req.body.mdp 
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            nomUtilisateur : updatedUser.nomUtilisateur,
            emailUtilisateur: updatedUser.emailUtilisateur,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
            online: true,
        })
    } else {
        res.status(404)
        throw new Error('User Not Found ! ')
    }
 })



export  { authUser, getUserProfile, updateUserProfile }