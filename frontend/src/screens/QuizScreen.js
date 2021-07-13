import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, } from 'react-bootstrap'
import Lequizz from '../components/Lequizz'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listQuizz, addQuizz } from '../actions/quizzActions'
import { QUIZZ_ADD_RESET } from '../constants/quizzConstants'


const QuizScreen = ( { history } ) => {

    const dispatch = useDispatch()

    const quizzList = useSelector(state => state.quizzList)
    const { loading, error, quizz } = quizzList

    const quizzDelete = useSelector(state => state.quizzDelete)
    const { loading: loadingDelete, error: errorDelete, sucess} = quizzDelete

    const quizzAdd = useSelector(state => state.quizzAdd)
    const { loading: loadingAdd, error: errorAdd, sucess: sucessAdd, quizzAd} = quizzAdd

    const quizzStart = useSelector(state => state.quizzStart)
    const { loading: loadingStart, error: errorStart, sucess: sucessStart} = quizzStart

    const quizzStop = useSelector(state => state.quizzStop)
    const { loading: loadingStop, error: errorStop, sucess: sucessStop} = quizzStop
    

    useEffect(() => {   
        dispatch({ type: QUIZZ_ADD_RESET })
        if (sucessAdd) {
            history.push(`/admin/myquizz/${quizzAd._id}/edit`)
        } else {
            dispatch(listQuizz())
        }
        if(sucess || sucessStart || sucessStop ) {
            dispatch(listQuizz())
        }
    }, [dispatch, sucessAdd, history, quizzAd, sucess, sucessStart, sucessStop])


    const addQuizzHandler = () => {
        dispatch(addQuizz())
    }
    
    return (
        <>
            <Row>
                <h1 className='text-center mb-3' style={{color: '#11246F'}}><strong> Mes QuizZ </strong> </h1>
            </Row>
            <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col>         
                    <button className ='btn btn-outline-success btn-sm ' onClick= {addQuizzHandler}>
                    <i className='fas fa-plus'></i> Créer Quizz</button>
                </Col>
            </Row>
            {loadingStart && <Loader />}
            {errorStart && <Message variant='danger'>{errorStart}</Message>}
            {loadingStop && <Loader />}
            {errorStop && <Message variant='danger'>{errorStop}</Message>}
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingAdd && <Loader />}
            {errorAdd && <Message variant='danger'>{errorAdd}</Message>}
            { loading  ? <Loader />: error ? <Message variant='alert m-3 alert-danger'>{error}</Message> : 
                        <Row >
                        {quizz.map((lequizz) => (
                            <Col key={lequizz._id} sm={12} md={6} lg={4} xl={3}  >
                                <Lequizz  lequizz={lequizz} />
                            </Col>
                        ))}
                    </Row> 
            }
    </>

    )
}

export default QuizScreen
