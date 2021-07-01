import  express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import quizzRoutes from './routes/quizzRoutes.js' 


dotenv.config()

connectDB()

const app = express()


app.get('/',(req, res) => {
    res.send('API is running...')
})

app.use('/admin/myquizz', quizzRoutes) 

app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode  on port ${PORT}`.yellow.bold))