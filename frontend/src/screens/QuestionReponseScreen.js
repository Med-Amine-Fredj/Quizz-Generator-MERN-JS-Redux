import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuestionByQuizzId, listQuestionDetails } from '../actions/quizzActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Reponse from '../components/Reponse'

const QuestionReponseScreen = ( { match, history } ) => {

    const  dispatch = useDispatch()  

    const questionList = useSelector(state => state.questionList)
    const {loading: loadingQ, error: errorQ, question} = questionList

    const questionDetails = useSelector(state => state.questionDetails)
    const { loading, success, questionDetail} = questionDetails

    const quizzByCode = useSelector(state => state.quizzByCode)
    const {loading: loadingC} = quizzByCode

    useEffect(() => {
        dispatch(getQuestionByQuizzId(questionDetail.quizzId))
        dispatch(listQuestionDetails(match.params.id))
        }, [dispatch,questionDetail.quizzId, match])


    return (
        <>
            { loadingQ  || loading || loadingC || question.length===0 || !success ? <Loader/>  : errorQ  ? <Message variant='danger'>{errorQ }</Message>: (
                <div>
                    <Reponse id={match.params.id} />
                    <div style={{ display: "flex" }}>
                    <button 
                        type="button" 
                        className="btn btn-outline-primary"
                        style={{ marginLeft: "auto" }}
                        onClick={() => history.goBack() } > 
                            Next
                    </button> 
                    </div>
            </div>
                  )}
          </> 
    )
}

export default QuestionReponseScreen

