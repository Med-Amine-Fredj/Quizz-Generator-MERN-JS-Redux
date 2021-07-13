import React, {  useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col,} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listGroupe, deleteGroupe } from '../actions/groupActions'

const GroupeListScreen = ( { history } ) => {

    const  dispatch = useDispatch()


    const groupesList = useSelector(state => state.groupesList)
    const { loading, error, groupes } = groupesList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const groupeDelete = useSelector(state => state.groupeDelete)
    const { sucess:sucessDelete } = groupeDelete


    useEffect(() => {
      if( userInfo && userInfo.isAdmin ) {
        dispatch(listGroupe())
      } else {
        history.push('/')
      }

    },[dispatch, history, userInfo, sucessDelete])

    const deleteHandler = (id) => {
      if( window.confirm('Are you sure ? ')) {
        dispatch(deleteGroupe(id))
      }
    }

    return (
        <>
                  <Row>
         <h1 className='text-center mb-3' style={{color: '#11246F'}}><strong> Mes Groupes </strong> </h1>
         
        </Row>
     <Row>
         <Col></Col>
         <Col></Col>  
         <Col></Col>
         
        <Col> 
        <LinkContainer to='/admin/groupes/addgroup'>  
             <button className ='btn btn-outline-success btn-sm ' >
            <i className='fas fa-plus '></i> Créer Groupe
            </button>
            </LinkContainer> 
            </Col>
    </Row>

    {loading ? <Loader /> : error ? <Message varaint='danger'>{error}</Message> : (
     <Table striped bordered hover responsive className='table-sm mt-4'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOM</th>
              <th>DESCRIPTION</th>
              <th>NOMBRES DES MEMBRES</th>
              <th></th>
            </tr>
          </thead>
        <tbody>
          {(groupes) ? ( groupes.map(groupe => (
              <tr key={groupe._id} >
                <td>{groupe._id}</td>
                <td>{groupe.nomGroupe}</td>
                <td>{groupe.descriptionGroupe}</td>
                <td className=''>
                  { groupe.nomMembres.length}
                </td>
                <td style={{textAlign: 'center'}}>
                  <LinkContainer to ={`groupes/${groupe._id}/edit`}>
                    <Button variant='btn-sm btn-outline-dark m-1' 
                    className='btn-sm btn-sm btn-outline-dark'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='btn-outline-danger'
                    className='btn-sm btn-outline-danger'
                    onClick = {() => deleteHandler(groupe._id)}
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

export default GroupeListScreen
