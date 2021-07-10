import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, } from 'react-bootstrap'
import Lequizz from '../components/Lequizz'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listQuizz } from '../actions/quizzActions'


const QuizScreen = () => {

    const dispatch = useDispatch()

    const quizzList = useSelector(state => state.quizzList)

    const quizzDelete = useSelector(state => state.quizzDelete)
    const { loading: loadingDelete, error: errorDelete, sucess} = quizzDelete

    const { loading, error, quizz } = quizzList

    useEffect(() => {
        dispatch(listQuizz())
    }, [dispatch])

    
    return (
        <>
    
    <Row>
         <h1 className='text-center mb-3'><strong> Mes QuizZ </strong> </h1>
         
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
             <button className ='btn btn-outline-light btn-sm ' >
            <i className='fas fa-plus '></i> Créer QuizZ
            </button></Col>
    </Row>
    { loading && loadingDelete ? <Loader />: error && errorDelete ? <Message variant='alert m-3 alert-danger'>{error}</Message> : 
                <Row >
                {quizz.map((lequizz) => (
                    <Col key={lequizz._id} sm={12} md={6} lg={4} xl={3}  >
                        <Lequizz  lequizz={lequizz} />
                    </Col>
                ))}
            </Row> 
    }
    {sucess && window.location.reload() }
    </>

    )
}

export default QuizScreen
