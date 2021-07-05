import React, {  useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col,} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listUsers, deleteUser } from '../actions/userActions'

const UsersScreen = ( { history } ) => {

    const  dispatch = useDispatch()


    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { sucess:sucessDelete } = userDelete

    useEffect(() => {
      if( userInfo && userInfo.isAdmin ) {
        dispatch(listUsers())
      } else {
        history.push('/')
      }

    },[dispatch, history, userInfo, sucessDelete])

    const deleteHandler = (id) => {
      if( window.confirm('Are you sure ? ')) {
        dispatch(deleteUser(id))
      }
    }

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
        <LinkContainer to='/admin/users/adduser'>  
             <button className ='btn btn-outline-light btn-sm ' >
            <i className='fas fa-plus '></i> Créer Utilisateur
            </button>
            </LinkContainer> 
            </Col>
    </Row>
    {loading ? <Loader /> : error ? <Message varaint='danger'>{error}</Message> : (
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
          {(users) ? ( users.map(user => (
              <tr key={user._id} >
                <td>{user._id}</td>
                <td>{user.nomUtilisateur}</td>
                <td>
                  <a href={`mailto:${user.emailUtilisateur}`}>{user.emailUtilisateur}</a>
                </td>
                <td>
                  { user.isAdmin ? (<i className='fas fa-check' style={{color:'green'}}></i>) : ( <i className='fas fa-times' style={{color: 'red'}}></i> )}
                </td>
                <td>
                  <LinkContainer to ={`user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick = {() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
          ))): <Loader />}
          </tbody>
        </Table>
        )}        
        </>
    )
}

export default UsersScreen
 