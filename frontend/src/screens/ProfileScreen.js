import React, { useState, useEffect } from 'react'
import {Form, Button, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const ProfileScreen = ( { history } ) => {

    const [nomUtilisateur, setName] = useState('')
    const [emailUtilisateur, setEmail] = useState('')
    const [mdp, setPassword] = useState('')
    const [confirmMdp, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        }else {
            if(!user.nomUtilisateur) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.nomUtilisateur)
                setEmail(user.emailUtilisateur)
            }
        }
    }, [dispatch,  history, user, userInfo])
   
    const submitHandler = (e) => {
        e.preventDefault()
        if( mdp !== confirmMdp ) {
            setMessage('Mot de passe Non Compatible')
        } else {
            dispatch(updateUserProfile({ id: user._id, nomUtilisateur, emailUtilisateur, mdp}))
        }
    }

    return (
      <>         
        <Link to='/'>
            <button className='btn btn-outline-primary btn-sm'>
            Go Back
            </button>
        </Link>
            <h1 className='text-center mt-5' style={{color: '#11246F'}}> <strong>Editer Profile </strong></h1>
            {message && <Message variant='danger mt-2' > { message }</Message>}
            {error && <Message variant='danger mt-2'>{error}</Message>}
            {success && <Message variant='success mt-2'>Données Du Profile Changées</Message>}
            {loading && <Loader/>   }
            <FormContainer> 
            <Form onSubmit={submitHandler} className='mt-4'>
                <Form.Group controlId='nomUtilisateur' >
                    <Form.Label> <strong>Nom D'Utiisateur :</strong></Form.Label>
                    <Form.Control  type='name' placeholder='Entrer Votre Nom' value={nomUtilisateur} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='emailUtilisateur' className='mt-4' >
                    <Form.Label> <strong>Addresse Email :</strong></Form.Label>
                    <Form.Control type='email' placeholder='Entrer Votre Addresse Email' value={emailUtilisateur} onChange={(e) => setEmail(e.target.value)} required></Form.Control>
                </Form.Group>

                <Form.Group controlId='mdp' className='mt-4' >
                    <Form.Label> <strong>Mot de Passe :</strong></Form.Label>
                    <Form.Control  type='password' placeholder='Entrer Votre Mot de passe' value={mdp} onChange={(e) => setPassword(e.target.value)} required></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmMdp' className='mt-4' >
                    <Form.Label> <strong>confirmer Mot de Passe :</strong></Form.Label>
                    <Form.Control  type='password' placeholder='Confirmer Votre Mot de passe' value={confirmMdp} onChange={(e) => setConfirmPassword(e.target.value)} required></Form.Control>
                </Form.Group>

                <Button type='Submit' variant='primary' className='mt-4'>
                    Terminer
                </Button>
            </Form>
          </FormContainer>
        </>
    )
}

export default ProfileScreen
