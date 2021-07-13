import React, { useEffect } from 'react'
import { Card, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { deleteQuestion } from '../actions/quizzActions'
import { getQuestionByQuizzId } from '../actions/quizzActions'


const Question = ( { ques } ) => {
    
    const  dispatch = useDispatch()


    const questionDeleteOne = useSelector(state => state.questionDeleteOne)
    const { loading, error, sucess} = questionDeleteOne

    const deleteHandler = (id) => {
      if( window.confirm('Are you sure ? ')) {
        dispatch(deleteQuestion(id))
      }
    }



    return (
        <>
            {loading && <Loader />}
            <Card className='card border-secondary mt-3 mb-3 p-3'>
            <Card.Body className='text-center p-1'>
                <Card.Title as='div'  />
                <div style={{ textAlign: 'right'}}> 
                <h5 className='text-center'> <strong style={{color: '#11246F'}} >Titre Question : {ques.titreQuestion} </strong></h5>   
                <Button 
                variant='btn-sm btn-outline-dark m-1' 
                className='btn-sm btn-sm btn-outline-dark'
                style={{ textAlign: 'right'}}>
                    <i className='fas fa-edit'></i>
                </Button>
                <Button 
                variant='btn-sm btn-outline-danger' 
                className='btn-sm btn-sm btn-outline-danger' 
                onClick = {() => deleteHandler(ques._id)}> 
                <i className='fas fa-trash'></i>
                </Button>
                </div>        
            </Card.Body>   
            <Card.Text as='div' >
            <strong  style={{color: '#21662F'}}>Type Question : </strong> {ques.typeQuestion}
            </Card.Text>  
            <Card.Text as='div' >
                <strong  style={{color: '#21662F'}}>Choix Disponible : </strong>
                    { ques.choixQuestion.map(q => (
                   <> {q} / </> 
                    ))}
            </Card.Text> 
            <Card.Text as='div' >
            <strong  style={{color: '#21662F'}}>Le(s) Réponse(s) : </strong>
                { ques.reponseQuestion.map(q => (
                   <> {q} / </> 
                    ))}
            </Card.Text>  
            <Card.Text as='div' >
            <strong  style={{color: '#21662F'}}> Temps De Réponse : </strong> {ques.tempsQuestion}
            </Card.Text>  
        </Card> 
        {sucess && window.location.reload()}
        </>
    )
}

export default Question
