import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { addUser } from '../actions/userActions.js'
import { USER_ADD_RESET } from '../constants/userConstants'

const UserAddScreen = ( { location, history } ) => {

    const [nomUtilisateur, setName] = useState(null)
    const [emailUtilisateur, setEmail] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [mdp, setPassword] = useState(null)
    const [confirmMdp, setConfirmPassword] = useState(null)
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userAdd = useSelector((state) => state.userAdd)
    const { loading , error , sucess} = userAdd

    useEffect(() => {
        if( sucess) {
            history.push('/admin/userslist')
            dispatch({ type: USER_ADD_RESET })
        } 
  
      },[dispatch, history, sucess])

    const submitHandler = (e) => {
        e.preventDefault()
        if( mdp !== confirmMdp ) {
            setMessage('Mot de passe Non Compatible')
        } else {
        dispatch(addUser(nomUtilisateur, emailUtilisateur, mdp, isAdmin))
        }
    }


    return (
        <>
    <Link to='/admin/userslist' >
    <button className='btn btn-outline-primary btn-sm'>
            Go Back
            </button>
      </Link>
      <FormContainer>
      <h1 className='text-center mb-3' style={{color: '#11246F'}}><strong> Ajouter Utilisateur </strong> </h1>
            {message && <Message variant='danger mt-2' > { message }</Message>}
            {error && <Message variant='danger mt-2'>{error}</Message>}
            {sucess && <Message variant='success mt-2'>User Created !</Message>}
            {loading && <Loader/>   }
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='nomUtilisateur' className='mt-4'>
              <Form.Label> <strong>Nom Utilisateur :</strong> </Form.Label>
              <Form.Control
                type='name'
                placeholder='Entrer Nom'
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='emailUtilisateur' className='mt-4'>
              <Form.Label> <strong>Addresse Email :</strong> </Form.Label>
              <Form.Control
                type='email'
                placeholder='Entrer Email'
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='mdp' className='mt-4' >
                    <Form.Label> <strong>Mot de Passe :</strong></Form.Label>
                    <Form.Control  type='password'
                     placeholder='Entrer Votre Mot de passe' 
                     value={mdp} onChange={(e) => setPassword(e.target.value)}
                     required>
                     </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmMdp' className='mt-4' >
                    <Form.Label><strong> confirmer Mot de Passe : </strong></Form.Label>
                    <Form.Control  type='password' 
                    placeholder='Confirmer Votre Mot de passe' 
                    value={confirmMdp} onChange={(e) => setConfirmPassword(e.target.value)}
                    required>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='isadmin' className='mt-4'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-4'>
              Ajouter
            </Button>
          </Form>
      </FormContainer>
        </>
    )
}

export default UserAddScreen
