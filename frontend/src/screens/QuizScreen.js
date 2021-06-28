import React from 'react'
import lesquizz from '../lesquizz'
import { Row, Col, } from 'react-bootstrap'
import Lequizz from '../components/Lequizz'

const QuizScreen = () => {
    return (
        <>
            <h1 className=' text-center mb-3'><strong> All My Quizz </strong> </h1>
            <Row >
                {lesquizz.map((lequizz) => (
                    <Col sm={12} md={6} lg={4} xl={3}  >
                        <Lequizz  lequizz={lequizz} />
                    </Col>
                ))}
            </Row>

    </>
    )
}

export default QuizScreen
