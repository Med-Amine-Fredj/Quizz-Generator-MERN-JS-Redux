import  express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import quizzRoutes from './routes/quizzRoutes.js' 
import userRoutes from './routes/userRoutes.js' 
import groupRoutes from './routes/groupRoutes.js'
import { logout } from './controllers/userController.js'
import uploadRoutes from './routes/uploadRoutes.js'
import reponseRoutes from './routes/reponseRoutes.js'


dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.put('/logout', logout)

app.get('/',(req, res) => {
    res.send('API is running...')
})

app.use('/myquizz', quizzRoutes) 
app.use('/users', userRoutes) 
app.use('/groupes', groupRoutes) 
app.use('/upload', uploadRoutes) 
app.use('/reponse', reponseRoutes) 

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode  on port ${PORT}`.yellow.bold))