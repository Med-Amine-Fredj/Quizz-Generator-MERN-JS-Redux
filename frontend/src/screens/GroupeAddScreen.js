import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { addGroup } from '../actions/groupActions.js'
import { GROUPE_ADD_RESET } from '../constants/groupConstants'
import {listUsers } from '../actions/userActions'

const GroupeAddScreen = ( { history } ) => {

    const [nomGroupe, setName] = useState("")
    const [descriptionGroupe, setEmail] = useState(null)
    const nomMembres = []
    const emailMembres = []


    const dispatch = useDispatch()

    const groupeAdd = useSelector((state) => state.groupeAdd)
    const { loading , error , sucess} = groupeAdd

    const userList = useSelector(state => state.userList)
    const { users } = userList

    useEffect(() => {
        dispatch(listUsers())
        if( sucess) {
            history.push('/admin/groupes')
            dispatch({ type: GROUPE_ADD_RESET })
        } 
      },[dispatch, history, sucess])

      const handleChangeNom = (e) => {
        const checked = e.target.checked;
        const checkedValue = e.target.value;
        const checkedName = e.target.name;
        if(checked) {
            nomMembres.push(checkedValue)
            emailMembres.push(checkedName)
        }
        };

    const submitHandler = (e) => {
        e.preventDefault() 
        dispatch(addGroup(nomGroupe, descriptionGroupe, nomMembres, emailMembres))
        }


    return (
        <>
        <Link to='/admin/groupes'>
          <button className='btn btn-outline-primary btn-sm'>
            Go Back
            </button>
        </Link>
      <FormContainer>
      <h1 className='text-center mb-3' style={{color: '#11246F'}} ><strong> Ajouter Groupe </strong> </h1>
            {error && <Message variant='danger mt-2'>{error}</Message>}
            {sucess && <Message variant='success mt-2'>Groupe Created !</Message>}
            {loading && <Loader/>   }
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='nomGroupe' className='mt-4'>
              <Form.Label><strong>Nom Groupe :</strong> </Form.Label>
              <Form.Control
                type='name'
                placeholder='Entrer Nom'
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='descriptionGroupe' className='mt-4'>
              <Form.Label><strong>Description Groupe :</strong> </Form.Label>
              <Form.Control
                type='text'
                placeholder='Entrer Description'
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='nomMembres' className='mt-4'>
            <Form.Label> <strong>Choix des Utilisateurs :</strong> </Form.Label>
            <Row>
                <Col>
                    {(users) ? ( users.map(user => (
                    <Form.Check
                    key={user._id}
                        type='radio'
                        label={user.nomUtilisateur}
                        name={user.emailUtilisateur}
                        value={user.nomUtilisateur}
                        onChange={(e) => handleChangeNom(e)}
                        
                    ></Form.Check>
                    ))): <Loader /> }
                </Col>
                <Col>
                {(users) ? ( users.map(user => (
                    <Form.Check
                        key={user._id}
                        type='radio'
                        label={user.emailUtilisateur}
                        hidden
                    ></Form.Check>
                    ))): <Loader /> }
                </Col>
              </Row>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-4'>
              Ajouter
            </Button>
          </Form>
      </FormContainer>           
        </>
    )
}

export default GroupeAddScreen
