import React from 'react'
import { Card, Button} from 'react-bootstrap'


const Question = ( { question } ) => {
    return (
        <>
        <Card className='card border-dark mt-3 mb-3 p-4 text-white'>
            <Card.Body className='text-center'>
                <Card.Title as='div'  />
                <h3 class='text-light'> <strong >Les Questions Du QuizZ </strong></h3>              
            </Card.Body>   
            <Card.Text as='div' >
                Nombre Totales des Questions : Exemple
            </Card.Text>  
            <Card className='card border-dark mt-3 mb-3 p-3 text-white'>
            <Card.Body className='text-center p-1'>
                <Card.Title as='div'  />
                <div style={{ textAlign: 'right'}}> 
                <h5 class='text-light text-center'> <strong >Question 1 : Titre Question  </strong></h5>   
                <Button variant='light' className='btn-sm' style={{ textAlign: 'right'}}><i className='fas fa-edit'></i></Button>
                <Button variant='danger' className='btn-sm'> <i className='fas fa-trash'></i></Button>
                </div>        
            </Card.Body>   
            <Card.Text as='div' >
                Type Question : Choix Unique ou Multiple
            </Card.Text>  
            <Card.Text as='div' >
                Choix Disponible : Choix1 / Choix1 / Choix1 / Choix1 /Choix1
            </Card.Text>  
            <Card.Text as='div' >
                Réponse Disponible : Réponse1 / Réponse1 / Réponse1 / Réponse1 / Réponse1
            </Card.Text>  
        </Card> 
        </Card>
        </>
    )
}

export default Question
