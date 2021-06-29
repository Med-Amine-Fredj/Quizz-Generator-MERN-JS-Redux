import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'

const UsersScreen = () => {
    return (
        <>
 <Table striped bordered hover responsive className='table-sm'>
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
                  <a href='#'>user.email</a>
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
