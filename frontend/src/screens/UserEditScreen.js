import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id

  const [nomUtilisateur, setName] = useState('')
  const [emailUtilisateur, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [mdp, setPassword] = useState('')
  const [confirmMdp, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading: loadingUpdate, error: errorUpdate, sucess: sucessUpdate, } = userUpdate

  useEffect(() => {
    if (sucessUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userslist')
    } else {
      if (!user.nomUtilisateur || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.nomUtilisateur)
        setEmail(user.emailUtilisateur)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, history, userId, user, sucessUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    if( mdp !== confirmMdp ) {
        setMessage('Mot de passe Non Compatible')
    } else {
    dispatch(updateUser({ _id: userId, nomUtilisateur, emailUtilisateur, isAdmin }))
    }
  }

  return (
    <>
      <Link to='/admin/userslist' className='btn btn-primary my-3'>
        Go Back
      </Link>
      <FormContainer>
      <h1 className='text-center mb-3'><strong> Editer Utilisateur </strong> </h1>
      {message && <Message variant='danger mt-2' > { message }</Message>}
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='nomUtilisateur' className='mt-4'>
              <Form.Label>Nom Utilisateur : </Form.Label>
              <Form.Control
                type='name'
                placeholder='Entrer Nom'
                value={nomUtilisateur}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='emailUtilisateur' className='mt-4'>
              <Form.Label>Addresse Email : </Form.Label>
              <Form.Control
                type='email'
                placeholder='Entrer Email'
                value={emailUtilisateur}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='mdp' className='mt-4' >
                    <Form.Label> Mot de Passe :</Form.Label>
                    <Form.Control  type='password'
                     placeholder='Entrer Votre Mot de passe' 
                     value={mdp} onChange={(e) => setPassword(e.target.value)}>
                     </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmMdp' className='mt-4' >
                    <Form.Label> confirmer Mot de Passe :</Form.Label>
                    <Form.Control  type='password' 
                    placeholder='Confirmer Votre Mot de passe' 
                    value={confirmMdp} onChange={(e) => setConfirmPassword(e.target.value)}>
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
              Editer
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
 