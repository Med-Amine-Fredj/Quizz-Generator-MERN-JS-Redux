import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Container, Button} from 'react-bootstrap'
import { Link, } from 'react-router-dom'
import Question from '../components/Question'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listQuizzDetails } from '../actions/quizzActions'

const QuizzDetailScreen = ({ match }) => {

    const dispatch = useDispatch()

    const quizzDetails = useSelector(state => state.quizzDetails)
    const {loading, error, lequizz} = quizzDetails

    useEffect(() => {
        dispatch(listQuizzDetails(match.params.id))

    }, [dispatch, match])


     
    return (
        <>
       
        { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>: (
            <Container>
            <Card className='card border-dark mt-1 mb-1 p-3 text-white'>
            <Card.Body className='text-center'>
                <Card.Title as='div' />
                 <h1 class='text-light'> <strong > {lequizz.nomQuizz} </strong></h1>         
                 <Card.Text className='text-center' >
                    {lequizz.activation==='encours' ? <span type="button" className="badge rounded-pill bg-success" >En Cours</span> : (
                        lequizz.activation==='finis' ? <span type="button" className="badge rounded-pill bg-danger">Finis</span> :
                        <span type="button" className="badge rounded-pill bg-warning">Non Commencé</span>)
                    }
                 </Card.Text>     
            </Card.Body>  
            <Card.Text as='div' >
                  Description QuizZ :  {lequizz.descriptionQuizz}
            </Card.Text>  
            <Card.Text as='h6' className='mb-3 card-text'>
                Code Quizz : {lequizz.codeQuizz}
            </Card.Text>  
            {lequizz.activation==='encours' ? <button type="button" className="btn btn-outline-danger">Arrétter QuizZ</button> : (
                lequizz.activation==='finis' ? <button type="button" className="btn btn-outline-info">Voi les résultats</button> : (
                <button type="button" className="btn btn-outline-success m-3" >Lancer Le Quizz</button>
                )
                )
            } 
        </Card>
        <Question  question={lequizz._id} />
        </Container>
        )}
        </>
    )
}

export default QuizzDetailScreen
