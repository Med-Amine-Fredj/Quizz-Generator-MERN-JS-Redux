import React, { useState, useEffect } from 'react'
import axios from 'axios'

const QuizzDetailScreen = ({ match }) => {

        const [quizz,SetQuiz] = useState({})

    useEffect(() => {
        const fetchQuiz = async () => {

           const { data } =  await axios.get(`/admin/myquizz/${match.params.id}`)

           SetQuiz(data)
        }
        fetchQuiz()
    }, [match])


    return (
        <>
           <h1>{quizz._id}</h1>
            <h1>{quizz.nomquizz}</h1> 
        </>
    )
}

export default QuizzDetailScreen
