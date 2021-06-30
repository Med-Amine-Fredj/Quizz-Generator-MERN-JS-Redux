import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, } from 'react-bootstrap'
import Lequizz from '../components/Lequizz'


const QuizScreen = () => {

    const[lesquizz, SetQuizz] = useState([])

    useEffect(() => {
        const fetchQuizz = async () => {
           const { data } =  await axios.get('/admin/myquizz')
           SetQuizz(data)
        }
        fetchQuizz()
    }, [])

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
            <Row >
                {lesquizz.map((lequizz) => (
                    <Col key={lequizz._id} sm={12} md={6} lg={4} xl={3}  >
                        <Lequizz  lequizz={lequizz} />
                    </Col>
                ))}
            </Row>

    </>
    )
}

export default QuizScreen
