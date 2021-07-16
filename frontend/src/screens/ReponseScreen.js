import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getQuestionByQuizzId } from '../actions/quizzActions'
import Question from '../components/Question'
import Loader from '../components/Loader'
import Message from '../components/Message'


const ReponseScreen = ({ match }) => {

    const  dispatch = useDispatch()

    const [seconde, setSecondes] = useState(10)
    const [time, setTime] = useState()


    const quizzByCode = useSelector(state => state.quizzByCode)
    const {loading, error, success, quizzCode} = quizzByCode

    const questionList = useSelector(state => state.questionList)
    const {loading: loadingQ, error: errorQ, question} = questionList

    const TimeHandler = () => {
        setTime(seconde)
    }
    useEffect(() => {
        dispatch(getQuestionByQuizzId(match.params.id))
       /* if (seconde > 0) {
            setTimeout(() => setSecondes(seconde - 1), 1000);
          } else {
            setSecondes('Finshed!');
        } */
    }, [seconde,setSecondes,quizzCode, dispatch, match])


    return (
        <>
         {quizzCode.activation}
        
            <button type='Submit' variant='primary' className ='btn btn-outline-primary btn-sm ' 
            onClick = {TimeHandler}>
            Test Time
            </button>
        <h1>{seconde}</h1>
        <h2>{time}</h2>
        { loading || loadingQ  ? <Loader /> : error || errorQ ? <Message variant='danger'>{error}</Message>: (
            <div>
                {question.map((q) => (
                            <div key={q._id} >
                                <Question  ques={q}  />
                            </div>            
                ))}
            </div>
        )}
        </>
    )
}

export default ReponseScreen

