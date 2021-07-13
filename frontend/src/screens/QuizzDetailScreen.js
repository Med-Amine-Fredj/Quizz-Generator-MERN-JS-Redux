import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Card, Container, Row, Col} from 'react-bootstrap'
import Question from '../components/Question'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listQuizzDetails, getQuestionByQuizzId } from '../actions/quizzActions'

const QuizzDetailScreen = ({ match }) => {

    const dispatch = useDispatch()

    const quizzDetails = useSelector(state => state.quizzDetails)
    const {loading, error, lequizz} = quizzDetails

    const questionList = useSelector(state => state.questionList)
    const {loading: loadingQ, error: errorQ, question} = questionList

    useEffect(() => {
        
        dispatch(getQuestionByQuizzId(match.params.id))
        dispatch(listQuizzDetails(match.params.id))
    }, [dispatch, match])


     
    return (
        <>
        <Link to='/admin/myquizz'>
            <button className='btn btn-outline-primary btn-sm'>
            Go Back
            </button>
        </Link>
        { loading || loadingQ ? <Loader /> : error || errorQ ? <Message variant='danger'>{error}</Message>: (
            <Container>
                <Card className='card border-secondary mt-4 mb-1 p-3'>
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
                {lequizz.activation==='encours' ? <button type="button" className="btn btn-outline-danger">Arrétter QuizZ</button> : (
                    lequizz.activation==='finis' ? <button type="button" className="btn btn-outline-warning">Voi les résultats</button> : (
                    <button type="button" className="btn btn-outline-success m-3" >Lancer Le Quizz</button>
                    )
                    )
                } 
            </Card>

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
                        <button type="button" className="btn btn-outline-success text" >Ajouter Question</button> 
                        </Card.Text> 
                    </Col>
                    <Col>       
                        <Card.Text as='div' style={{ textAlign: 'right'}}>
                        <button type="button" className="btn btn-outline-danger text" >Supprimer Tous</button> 
                        </Card.Text> 
                    </Col>
                </Row>
                {question.map((q) => (
                    <div key={q._id} >
                        <Question  ques={q} />
                    </div>            
                ))}
            </Card>
        </Container>
        )}
    </>
    )
}

export default QuizzDetailScreen
