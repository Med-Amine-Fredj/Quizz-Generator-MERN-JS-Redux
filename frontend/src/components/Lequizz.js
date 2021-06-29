import React from 'react'
import { Card, Container,} from 'react-bootstrap'
import { Link, } from 'react-router-dom'


const Lequizz = ( { lequizz } ) => {
    return (
        <Container>
        <Card className='card border-dark mt-3 mb-3 p-3 text-white'>
            <Link to={`/admin/myquizz/${lequizz._id}`}>
                <Card.Img style={{height: '9rem'}} src={lequizz.image} variant='top' />
            </Link>
            <Card.Body className='text-center'>
            <Link to={`/admin/myquizz/${lequizz._id}`} className= 'card-title'>
                <Card.Title as='div'  />
                <h4> <strong > {lequizz.nomquizz} </strong>
                </h4>
               
            </Link>               
            </Card.Body>   
            <Card.Text as='div' >
                <div className='my-3'>
                    {lequizz.description}
                </div>    
            </Card.Text>  
            <Card.Text as='h6' className='mb-3 card-text'>
                Code Quizz : {lequizz.code}
            </Card.Text>  
            <Card.Text className='card-text text-center '>
            {lequizz.activation==='encours' ? <button type="button" class="btn btn-outline-success">En Cours</button> : (
                lequizz.activation==='finis' ? <button type="button" class="btn btn-outline-danger">Finis</button> :
                <button type="button" class="btn btn-outline-warning">Non Commencé</button>)
            }
            </Card.Text>     
            <Card.Text className='card-text text-center p-1'>
            <button disabled={lequizz.activation==='encours' || lequizz.activation==='finis'} class="badge rounded-pill bg-light">Editer</button>
            <button disabled={lequizz.activation==='encours' } class="badge rounded-pill bg-danger ">Supprimer</button>
            <button id='view' class="badge rounded-pill bg-primary">Visionner</button>
            </Card.Text> 
        </Card>
        </Container>
    )
}

export default Lequizz
