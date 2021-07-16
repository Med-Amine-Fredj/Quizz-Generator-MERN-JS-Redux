import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form,  Row, Col } from 'react-bootstrap'
import { getQuizzByCode } from '../actions/reponseActions'
import { QUIZZ_LIST_BYCODE_RESET } from '../constants/reponseConstants'
import Message from '../components/Message'


const HomeScreen = ({history}) => {

    const  dispatch = useDispatch()

    const [code, setCode] = useState(null)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const quizzByCode = useSelector(state => state.quizzByCode)
    const {loading, error, success, quizzCode} = quizzByCode

    useEffect(() => {

        if(!error && !loading) {
            if(success) {
                dispatch({ type: QUIZZ_LIST_BYCODE_RESET,
                payload : quizzCode })
                history.push(`/reponse/${quizzCode._id}`)
            }  
        }
    }, [history, loading, error, success,quizzCode, code, dispatch])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(getQuizzByCode(code))
    }

    return (
        <>
       <h1 className='text-center mt-4' style={{color: '#11246F'}}> <strong>Welcome To Live QuizZ</strong></h1>    
       {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={submitHandler} className='mt-4'
            hidden={!userInfo || userInfo.isAdmin} >
                <Row>
                    <Col></Col>
                    <Col>
                        <Form.Control  type='text' placeholder='Entrer Code Quizz'
                        className ='btn-sm'
                        onChange={(e) => setCode(e.target.value)}
                        required>
                        </Form.Control>
                    </Col>
                    <Col>                
                        <button type='Submit' variant='primary' className ='btn btn-outline-primary btn-sm '>
                        Commencer
                        </button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default HomeScreen
