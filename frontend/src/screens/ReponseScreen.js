import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap'
import {getQuestionByQuizzId, listQuizzDetails } from '../actions/quizzActions'
import Loader from '../components/Loader'
import Message from '../components/Message'




const ReponseScreen = ({ match, history }) => {

    const  dispatch = useDispatch()

    const questionList = useSelector(state => state.questionList)
    const {loading: loadingQ, error: errorQ, question} = questionList

    const quizzDetails = useSelector(state => state.quizzDetails)
    const {loading: loadingD, error: errorD, lequizz} = quizzDetails

    useEffect(() => {
        dispatch(getQuestionByQuizzId(match.params.id))
        dispatch(listQuizzDetails(match.params.id))
    }, [dispatch, match])

    const reloadHandler =() => {
        window.location.reload();
    }


    return (
        <>
            <div style={{ display: "flex" }}>
            <Link to='/'>
                <button className='btn btn-outline-primary btn-sm'
                style={{ marginRight: "auto" }}>
                    Go Back
                </button>
            </Link>
            <button 
            style={{ marginLeft: "auto" }}
            onClick={ reloadHandler}
            className='btn btn-link btn-sm'> 
                Refresh
            </button>
            </div>
            <Container>
                { loadingQ || loadingD ? <Loader /> : errorQ || errorD ? <Message variant='danger'>{errorQ || errorD}</Message>: (
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
                        <Card.Text as='div' >
                            <h4 className='margin-left mt-2 ml-10' ><strong style={{color: '#21662F'}}>Code Quizz : : </strong>{lequizz.codeQuizz} </h4>
                        </Card.Text>  
                        <Card.Text as='div' >
                            <h4 className='margin-left mt-2 ml-10' ><strong style={{color: '#21662F'}}>Nombre Totales des Questions : </strong>{question.length} </h4>
                        </Card.Text>   
                        <button type="button" className="btn btn-outline-danger" 
                       disabled={lequizz.activation==='finis' || lequizz.activation==='noncommencer'}
                        onClick = { () => question.map((q) => ( 
                        history.push(`/reponse/${lequizz._id}/question/${q._id}`)
                        ))}> 
                            Commencer
                        </button>
                    </Card>
                )}
            </Container>
        </>
    )
}

export default ReponseScreen

