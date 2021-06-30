import  express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import lesquizz from './data/lesquizz.js'


dotenv.config()

connectDB()

const app = express()


app.get('/',(req, res) => {
    res.send('API is running...')
})

app.get('/admin/myquizz',(req, res) => {
    res.json(lesquizz)
})

app.get('/admin/myquizz/:id',(req, res) => {
    const quizz = lesquizz.find(q => q._id === req.params.id)
    res.json(quizz)
})


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode  on port ${PORT}`))