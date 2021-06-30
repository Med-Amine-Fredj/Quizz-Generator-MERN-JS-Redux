import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col,} from 'react-bootstrap'

const UsersScreen = () => {
    return (
        <>
        <Row>
         <h1 className='text-center mb-3'><strong> Mes Utilisateurs </strong> </h1>
     </Row>
     <Row>
         <Col></Col>
         <Col></Col>
         <Col></Col>
        <Col>       
             <button className ='btn btn-outline-light btn-sm ' >
            <i className='fas fa-plus '></i> Créer Utilisateur
            </button></Col>
    </Row>
     <Table striped bordered hover responsive className='table-sm mt-4'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              <tr >
                <td>user._id</td>
                <td>user.name</td>
                <td>
                  <a href='#home'>user.email</a>
                </td>
                <td>
                admin ou pas
                </td>
                <td>
                  <LinkContainer to='#'>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
          </tbody>
        </Table>            
        </>
    )
}

export default UsersScreen
