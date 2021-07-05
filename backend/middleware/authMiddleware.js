import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Utilisateurs from '../models/utilisateurModel.js'

const protect = asyncHandler( async (req, res, next) => {
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        
        try {
            token = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await Utilisateurs.findById(decode.id).select('-mdp')
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not Authorized : Token Failed ! ')
        }
    }
    if(!token) {
        res.status(401)
        throw new Error('Not Authorized : No Token Found ! ')
    }

})


const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not Authorized ! You Have To Connect With Admin')
    }
} 

export { protect, admin}