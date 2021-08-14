import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Card, Form, Button  } from 'react-bootstrap'
import { listQuestionDetails } from '../actions/quizzActions'
import { addReponse } from '../actions/reponseActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { QUESTION_GETBYID_RESET } from '../constants/quizzConstants'



const Reponse = ({ id } ) => {

    const  dispatch = useDispatch()


    const [reponse, setResponse] = useState([])

    const [stop, setStop] = useState(false)

    const questionList = useSelector(state => state.questionList)
    const {loading: loadingQ, error: errorQ} = questionList

    const questionDetails = useSelector(state => state.questionDetails)
    const {loading, error, success,  questionDetail} = questionDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    
    const [tempsReponse, setTime] = useState()


    const TimeHandler = () => {
        setTime(questionDetail.tempsQuestion - seconde)
        setSecondes("0")
    }

    let secondes

    if(!loading || !loadingQ) {
        secondes = questionDetail.tempsQuestion  
    }   

    const [seconde, setSecondes] = useState(secondes)




    useEffect(() => {

        if(success) {
            dispatch(listQuestionDetails(id)) 
             }  else {
            dispatch({
                type: QUESTION_GETBYID_RESET
            })
            }

            
      if (seconde > 0) {
           setTimeout(() => setSecondes(seconde - 1), 1000);
         } else {
            setSecondes("0")
            setStop(true)
         }
    }, [setSecondes,seconde,secondes,id,dispatch,success])


    const handleChangeNom = (e) => {
        const checked = e.target.checked;
        const checkedName = e.target.name;
        if(checked) {
            setResponse([...reponse, checkedName])
        }
    }

    const submitHandler = (e) => {
        e.preventDefault() 
       dispatch(addReponse(userInfo._id, questionDetail._id, questionDetail.quizzId, tempsReponse, reponse))
       setStop(true)
    }


return (
    
    <> 
    
    <Container>
    {loading || loadingQ ? <Loader /> : error  || errorQ ? <Message varaint='danger'>{error || errorQ}</Message> : (
    <Card className='card border-secondary mt-5 mb-3 p-5'>
            <Card.Body className='text-center p-1'>
                <Card.Title as='div'  />
                <div style={{ textAlign: 'right'}}> 
                <h5 className='text-center'> <strong style={{color: '#11246F'}} >{questionDetail.titreQuestion} : </strong></h5>   
                </div>        
            </Card.Body>   
            <Form onSubmit={submitHandler} >
                <Card.Text as='div' >
                    { questionDetail.choixQuestion.map(q => (
                        <Form.Check
                            type='radio'
                            label={q}
                            name={q}
                            value={q}
                            onChange={(e) => handleChangeNom(e)}
                            disabled={stop}>
                            </Form.Check>
                            ))}
                </Card.Text>   
                <Card.Text as='div' style={{ display: "flex" }}>
                <Card.Text as='h6' className='mt-5 text-muted'>
                    Temps Restans : {seconde}
                </Card.Text>  
                <Button type='submit' variant='success' className='mt-4' style={{ marginLeft: "auto" }}
                onClick={TimeHandler} 
                disabled={stop}>
                Terminer
                </Button>
                </Card.Text>
            </Form>
        </Card> 
         )}
        </Container>
    </>
    
)
}

export default Reponse
