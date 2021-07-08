import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Badge, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { updateGroup, getGroupDetails } from '../actions/groupActions'
import { GROUPE_UPDATE_RESET } from '../constants/groupConstants'
import {listUsers } from '../actions/userActions'

const GroupeEditScreen = ({ match, history }) => {


    const groupId = match.params.id

    const [nomGroupe, setName] = useState('')
    const [descriptionGroupe, setDesc] = useState('')
    const [nomMembres, setNom] = useState([])
    const [emailMembres, setMail] = useState([])
    const [oldM, setOld] = useState([])

    const dispatch = useDispatch()
  
    const groupDetails = useSelector((state) => state.groupDetails)
    const { loading, error, group } = groupDetails
  
    const userList = useSelector(state => state.userList)
    const { users } = userList

    const groupUpdate = useSelector((state) => state.groupUpdate)
    const { loading: loadingUpdate, error: errorUpdate, sucess: sucessUpdate, } = groupUpdate
  
    useEffect(() => {
        dispatch(listUsers())
      if (sucessUpdate) {
        dispatch({ type: GROUPE_UPDATE_RESET })
        history.push('/admin/groupes')
      } else {
        if (!group.nomGroupe || group._id !== groupId) {
          dispatch(getGroupDetails(groupId))
        } else {
          setName(group.nomGroupe)
          setDesc(group.descriptionGroupe)
          setOld(group.nomMembres)
        }
      }
    }, [dispatch, history, groupId, group, sucessUpdate])


    const handleChangeNom = (e) => {
        const checked = e.target.checked;
        const checkedValue = e.target.value;
        const checkedName = e.target.name;
        if(checked) {
            setNom([...nomMembres, checkedValue])
            setMail([...emailMembres, checkedName])
        }
    };

    const submitHandler = (e) => {
      e.preventDefault()
      console.log(nomMembres)
      dispatch(updateGroup({_id:groupId, nomGroupe, descriptionGroupe, nomMembres, emailMembres}))
    }

    return (
        <>
<Link to='/admin/groupes' className='btn btn-primary my-3'>
        Go Back
      </Link>
      <FormContainer>
      <h1 className='text-center mb-3'><strong> Editer Groupe </strong> </h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='nomGroupe' className='mt-4'>
              <Form.Label>Nom Utilisateur : </Form.Label>
              <Form.Control
                type='name'
                placeholder='Entrer Nom'
                value={nomGroupe}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='descriptionGroupe' className='mt-4'>
              <Form.Label>Addresse Email : </Form.Label>
              <Form.Control
                type='text'
                placeholder='Entrer Email'
                value={descriptionGroupe}
                onChange={(e) => setDesc(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='nomMembres' className='mt-4'>
            <Form.Label>Choix des Utilisateurs : 
                <Badge bg="danger" className='text-danger'>
                Il Faut Re-Sélectionner Tous Les membres (Nouveux et anciens)
                Sinon le groupe est Considérer comme vide...
                    </Badge> 
                </Form.Label>

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
            <Row>
            <Col>
                    <h6 className='mt-3'>Les Nouveux Membres :</h6>
                    <ListGroup className='mt-1'>
                        { nomMembres.map(nm => (
                        <ListGroup.Item className='text-center' variant="success">{nm}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col>        
                <h6 className='mt-3'>Les Anciens Membres :</h6>
                <ListGroup className='mt-2'>
                    { oldM.map(old => (
                    <ListGroup.Item variant="danger" className='text-center'>{old}</ListGroup.Item>
                    ))}
                </ListGroup>
                </Col>
            </Row>
            <Button type='submit' variant='primary' className='mt-4'>
              Editer
            </Button>
          </Form>
        )}
      </FormContainer>          
        </>
    )
}

export default GroupeEditScreen
