import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Card, Container, Row, Col} from 'react-bootstrap'
import Question from '../components/Question'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listQuizzDetails, getQuestionByQuizzId, startQuizz, stopQuizz, deleteAllQuestion } from '../actions/quizzActions'
import { LinkContainer } from 'react-router-bootstrap'
import { QUESTION_DELETE_ALL_RESET, QUESTION_DELETE_RESET } from '../constants/quizzConstants'

const QuizzDetailScreen = ({ match }) => {

    const dispatch = useDispatch()

    const quizzDetails = useSelector(state => state.quizzDetails)
    const {loading, error, lequizz} = quizzDetails

    const questionList = useSelector(state => state.questionList)
    const {loading: loadingQ, error: errorQ, question} = questionList

    const questionDeleteOne = useSelector(state => state.questionDeleteOne)
    const { loading: loadingDelete, error: errorDelete, sucess} = questionDeleteOne

    const questionDeleteAll = useSelector(state => state.questionDeleteAll)
    const { loading: loadingDeleteAll, error: errorDeleteAll, sucess: sucessDeleteAll} = questionDeleteAll

    const quizzStart = useSelector(state => state.quizzStart)
    const { loading: loadingStart, error: errorStart, sucess: sucessStart} = quizzStart

    const quizzStop = useSelector(state => state.quizzStop)
    const { loading: loadingStop, error: errorStop, sucess: sucessStop} = quizzStop

    const startQuizzHandler = (id) => {
        dispatch(startQuizz(id))
    }   

    const stopQuizzHandler = (id) => {
        dispatch(stopQuizz(id))
    }

    const deleteHandler = (id) => {
        if( window.confirm('Are you sure ? ')) {
          dispatch(deleteAllQuestion(id))
        }
      }

    useEffect(() => {
        if(sucessStart || sucessStop ) {
            dispatch(getQuestionByQuizzId(match.params.id))
            dispatch(listQuizzDetails(match.params.id))
        }
        if(sucess) {
            dispatch({ type: QUESTION_DELETE_RESET })
        }
        if(sucessDeleteAll) {
            dispatch({ type: QUESTION_DELETE_ALL_RESET })
        }
        dispatch(getQuestionByQuizzId(match.params.id))
        dispatch(listQuizzDetails(match.params.id))
    }, [dispatch, match, sucess,sucessStart, sucessStop,sucessDeleteAll])


     
    return (
        <>
        <Link to='/admin/myquizz'>
            <button className='btn btn-outline-primary btn-sm'>
            Go Back
            </button>
        </Link>
            <Container>
                { loading || loadingStart || loadingStop ? <Loader /> : error || errorStart || errorStop ? <Message variant='danger'>{error}</Message>: (
                <Card className='card border-secondary mt-4 mb-1 p-3' >
                <Card.Body className='text-center'>
                    <Card.Title as='h1'>
                        <strong   style={{color: '#11246F'}}> {lequizz.nomQuizz} </strong>   
                    </Card.Title>   
                    <Card.Text className='text-center' >
                        {lequizz.activation==='encours' ? <span type="button" className="badge rounded-pill bg-success" >En Cours</span> : (
                            lequizz.activation==='finis' ? <span type="button" className="badge rounded-pill bg-danger">Finis</span> :
                            <span type="button" className="badge rounded-pill bg-warning">Non Commencé</span>)
                        }
                    </Card.Text>     
                </Card.Body>  
                <Card.Text as='h5' className='mt-2'>
                <strong  style={{color: '#21662F'}}> Description QuizZ : </strong> {lequizz.descriptionQuizz}
                </Card.Text>  
                <Card.Text as='h5' className='mb-3 card-text'>
                <strong  style={{color: '#21662F'}}> Code Quizz : </strong>{lequizz.codeQuizz}
                </Card.Text>  
                {lequizz.activation==='encours' ? 
                <button type="button" className="btn btn-outline-danger" onClick = {() => stopQuizzHandler({id: lequizz._id})}>
                    Arrétter QuizZ
                </button> : (
                lequizz.activation==='finis' ? 
                <button type="button" className="btn btn-outline-warning">
                    Voi les résultats
                </button> : (
                <button type="button" className="btn btn-outline-success m-3" onClick = {() => startQuizzHandler({id: lequizz._id})}>
                    Lancer Le Quizz
                </button>
                    )
                    )
                } 
            </Card>
            )}
            { loading || loadingQ || loadingDelete || sucess || loadingDeleteAll ? <Loader /> : error || errorQ || errorDelete || errorDeleteAll ? <Message variant='danger'>{error}</Message>: (
            <Card className='card border-secondary mt-3 mb-3 p-4'>
                <Card.Body className='text-center'>
                    <Card.Title as='div'  />
                    <h2> <strong style={{color: '#11246F'}}>Les Questions Du QuizZ :  </strong></h2>              
                </Card.Body>  
                <Card.Text as='div' >
                <h4 className='margin-left mt-2 ml-10' ><strong style={{color: '#21662F'}}>Nombre Totales des Questions : </strong>{question.length} </h4>
                </Card.Text>  
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col>                          
                        <Card.Text as='div' style={{ textAlign: 'right'}}>
                            <LinkContainer to={`/admin/myquizz/${match.params.id}/addquestion`} 
                            disabled={lequizz.activation==='encours' ||lequizz.activation==='finis'}>
                                <button type="button" 
                                className="btn btn-outline-success text" >
                                    Ajouter Question
                                </button> 
                            </LinkContainer>
                        </Card.Text> 
                    </Col>
                    <Col>       
                        <Card.Text as='div' style={{ textAlign: 'right'}}>
                        <button type="button" className="btn btn-outline-danger text" 
                        disabled={lequizz.activation==='encours' ||lequizz.activation==='finis'}
                        onClick = {() => deleteHandler(match.params.id)}
                        >Supprimer Tous</button> 
                        </Card.Text> 
                    </Col>
                </Row>
                {question.map((q) => (
                    <div key={q._id} >
                        <Question  ques={q} />
                    </div>            
                ))}
            </Card>
            )}
        </Container>
        
    </>
    )
}

export default QuizzDetailScreen
