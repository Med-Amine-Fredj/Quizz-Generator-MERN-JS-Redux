import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Card} from 'react-bootstrap'
import ResultQuestion from '../components/ResultQuestion'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getQuestionByQuizzId  } from '../actions/quizzActions'
import { getResponseByQuizzId } from '../actions/reponseActions'
import { listUsers } from '../actions/userActions'
import { listGroupe } from '../actions/groupActions'




const QuizzResultScreen = ({ match }) => {

    const dispatch = useDispatch()


    const questionList = useSelector(state => state.questionList)
    const {loading: loadingQ, error: errorQ, question} = questionList

    const responseListByQuizz = useSelector(state => state.responseListByQuizz)
    const {loading, error, reponses} = responseListByQuizz

    useEffect(() => {
        dispatch(getResponseByQuizzId(match.params.id))
        dispatch(getQuestionByQuizzId(match.params.id))
        dispatch(listUsers())
        dispatch(listGroupe())
    }, [dispatch, match,reponses])



    
    return (
        <>
            <Link to='/admin/myquizz'>
                <button className='btn btn-outline-primary btn-sm'>
                    Go Back
                    </button>
            </Link>
            <h1 className='text-center mb-3' style={{color: '#11246F'}} ><strong> Résultats Quizz </strong> </h1>
            {loading || loadingQ ? <Loader /> : error || errorQ ? <Message varaint='danger'>{error || errorQ}</Message> : (
            question.map((q) => (
                    <Card key={q._id} className='card border-dark mt-4 mb-3 p-3' >
                        <ResultQuestion  ques={q} />
                    </Card>     
                ))
            )}
              

        </>
    )
}

export default QuizzResultScreen
