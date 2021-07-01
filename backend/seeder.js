import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import utilisateurs from './data/utilisateurs.js'
import lesquizz from './data/lesquizz.js'
import Utilisateurs from './models/utilisateurModel.js'
import Quizz from './models/quizzModel.js' 
import Groupe from './models/groupesModel.js' 
import Question from './models/questionModel.js' 
import Reponse from './models/reponseModel.js' 
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Reponse.deleteMany()
        await Question.deleteMany()
        await Groupe.deleteMany()
        await Quizz.deleteMany()
        await Utilisateurs.deleteMany()

        const createdUser = await Utilisateurs.insertMany(utilisateurs)

        const adminUser = createdUser[0]._id

        const simpleQuizz = lesquizz.map(quizz => {
            return { ...quizz, utilisateur: adminUser }
        })


        await Quizz.insertMany(simpleQuizz)

        console.log('Data imported !'.green.inverse)
        process.exit()

    } catch (error) {
        
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {

        await Reponse.deleteMany()
        await Question.deleteMany()
        await Groupe.deleteMany()
        await Quizz.deleteMany()
       
        console.log('Data Destroyed !'.red.inverse)
        process.exit()

    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}   

if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}