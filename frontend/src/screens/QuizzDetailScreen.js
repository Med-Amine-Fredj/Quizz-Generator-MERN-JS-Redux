import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Card, Container} from 'react-bootstrap'
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
       
        { loading || loadingQ ? <Loader /> : error || errorQ ? <Message variant='danger'>{error}</Message>: (
            <Container>
                <Card className='card border-dark mt-1 mb-1 p-3 text-white'>
                <Card.Body className='text-center'>
                    <Card.Title as='h1'>
                        <strong  className='text-light'> {lequizz.nomQuizz} </strong>   
                    </Card.Title>   
                    <Card.Text className='text-center' >
                        {lequizz.activation==='encours' ? <span type="button" className="badge rounded-pill bg-success" >En Cours</span> : (
                            lequizz.activation==='finis' ? <span type="button" className="badge rounded-pill bg-danger">Finis</span> :
                            <span type="button" className="badge rounded-pill bg-warning">Non Commencé</span>)
                        }
                    </Card.Text>     
                </Card.Body>  
                <Card.Text as='h5' >
                <strong  className='text-info'>Description QuizZ :  </strong> {lequizz.descriptionQuizz}
                </Card.Text>  
                <Card.Text as='h5' className='mb-3 card-text'>
                <strong  className='text-info'> Code Quizz : </strong>{lequizz.codeQuizz}
                </Card.Text>  
                {lequizz.activation==='encours' ? <button type="button" className="btn btn-outline-danger">Arrétter QuizZ</button> : (
                    lequizz.activation==='finis' ? <button type="button" className="btn btn-outline-info">Voi les résultats</button> : (
                    <button type="button" className="btn btn-outline-success m-3" >Lancer Le Quizz</button>
                    )
                    )
                } 
            </Card>

            <Card className='card border-dark mt-3 mb-3 p-4 text-white'>
                <Card.Body className='text-center'>
                    <Card.Title as='div'  />
                    <h2> <strong className='text-light'>Les Questions Du QuizZ :  </strong></h2>              
                </Card.Body>  
                <Card.Text as='div' >
                <h4 className='margin-left mt-2 ml-10'><strong className='text-info'>Nombre Totales des Questions : </strong>{question.length} </h4>
                </Card.Text>  
                <Card.Text as='div' style={{ textAlign: 'right'}}>
                <button type="button" className="btn btn-outline-danger text" >Supprimer Tous</button> 
                </Card.Text> 
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
