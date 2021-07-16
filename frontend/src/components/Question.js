import React, { useEffect } from 'react'
import { Card, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { deleteQuestion } from '../actions/quizzActions'
import { QUESTION_DELETE_RESET } from '../constants/quizzConstants'


const Question = ( { ques } ) => {
    
    const  dispatch = useDispatch()

    const quizzDetails = useSelector(state => state.quizzDetails)
    const {lequizz} = quizzDetails

    const questionDeleteOne = useSelector(state => state.questionDeleteOne)
    const { loading, error, sucess} = questionDeleteOne


    
    useEffect(() => {
        if(sucess) {
            dispatch({ type: QUESTION_DELETE_RESET })
        }
        
    }, [sucess, dispatch])

    const deleteHandler = (id) => {
      if( window.confirm('Are you sure ? ')) {
        dispatch(deleteQuestion(id))
      }
    }



    return (
        <>
            {loading && <Loader />}
            {error  && <Message variant='danger'>{error}</Message>}
            {loading ? <Loader /> : sucess ? <Loader /> : (
                <Card className='card border-secondary mt-3 mb-3 p-3'>
            <Card.Body className='text-center p-1'>
                <Card.Title as='div'  />
                <div style={{ textAlign: 'right'}}> 
                <h5 className='text-center'> <strong style={{color: '#11246F'}} >Titre Question : {ques.titreQuestion} </strong></h5>   

                </div>        
            </Card.Body>   
            <Card.Text as='div' >
            <strong  style={{color: '#21662F'}}>Type Question : </strong> {ques.typeQuestion}
            </Card.Text>  
            <Card.Text as='div' >
                <strong  style={{color: '#21662F'}}>Choix Disponible : </strong>
                    { ques.choixQuestion.map(q => (
                        <>{q}/ </>
                    ))}
            </Card.Text> 
            <Card.Text as='div' >
            <strong  style={{color: '#21662F'}}>Le(s) Réponse(s) : </strong>
                { ques.reponseQuestion.map(q  => (
                   <> {q} / </> 
                ))}
            </Card.Text>  
            <Card.Text as='div' >
            <strong  style={{color: '#21662F'}}> Temps De Réponse : </strong> {ques.tempsQuestion} Secondes
            </Card.Text>  
            <div style={{ textAlign: 'right'}}> 
                <Button 
                variant='btn-sm btn-outline-danger' 
                className='btn-sm btn-sm btn-outline-danger' 
                disabled={lequizz.activation==='encours' ||lequizz.activation==='finis'}
                onClick = {() => deleteHandler(ques._id)}> 
                <i className='fas fa-trash'></i>
                </Button>
                </div>     
        </Card> 
            )}
        
        </>
    )
}

export default Question
