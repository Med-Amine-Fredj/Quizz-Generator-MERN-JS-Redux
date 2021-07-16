import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Badge } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { QUESTION_ADD_RESET } from '../constants/quizzConstants'
import { addQuestion } from '../actions/quizzActions'
import Loader from '../components/Loader'
import Message from '../components/Message'



const QuestionAddScreen = ({history, match}) => {

  const dispatch = useDispatch()

  const [choix1, setChoix1] = useState('')
  const [choix2, setChoix2] = useState('')
  const [choix3, setChoix3] = useState('')
  const [choix4, setChoix4] = useState('')
  const [choix5, setChoix5] = useState('')
  const [tempsQuestion, setTime] = useState('')
  const [typeQuestion, setType] = useState('')
  const [titreQuestion, setTitre] = useState('')


  let choixQuestion = []

  const [reponseQuestion, setReponse] = useState([])

  if(choix1) {
    choixQuestion = [choix1]
  } 
  if(choix2) {
    choixQuestion = [choix1,choix2]
  }
  if(choix3) {
    choixQuestion = [choix1,choix2,choix3]
  }
  if(choix4) {
    choixQuestion = [choix1,choix2,choix3,choix4]
  }
  if(choix5) {
    choixQuestion = [choix1,choix2,choix3,choix4,choix5]
  }

  const handleChangeNom = (e) => {
    const checked = e.target.checked;
    const checkedValue = e.target.value;
    if(checked) {
        setReponse([...reponseQuestion, checkedValue])
    }
  };

  const handleChangeTime = (e) => {
    const checkedValue = e.target.value;
        setTime(checkedValue)
    }

    const handleChangeType = (e) => {
      const checkedValue = e.target.value;
          setType(checkedValue)
      }

    const handleChangeTitre = (e) => {
        const checkedValue = e.target.value;
            setTitre(checkedValue)
    }

    const questionAdd = useSelector((state) => state.questionAdd)
    const { loading , error , sucess} = questionAdd

    useEffect(() => {
      if(sucess) {
          history.push(`/admin/myquizz/${match.params.id}/`)
          dispatch({ type: QUESTION_ADD_RESET })
      } 

    },[dispatch, history, sucess, match])

    const submitHandler =(e) => {
      e.preventDefault()
      dispatch(addQuestion(match.params.id,titreQuestion, typeQuestion, tempsQuestion, choixQuestion, reponseQuestion))
    }



    return (
        <>
        { loading && <Loader /> }
        {error  && <Message variant='danger'>{error}</Message>}
        <Link to={`/admin/myquizz/${match.params.id}`}>
            <button className='btn btn-outline-primary btn-sm'>
            Go Back
            </button>
        </Link>
         <h1 className='text-center mb-3' style={{color: '#11246F'}}><strong> Ajouter Question </strong> </h1>  
        <FormContainer>
            <Form  onSubmit={submitHandler}>
              <Form.Group controlId='titreQuestion' className='mt-4'>
                <Form.Label> <strong>Titre Question :</strong> </Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Entrer Nom '
                  onChange={(e) => handleChangeTitre(e)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='typeQuestion' className='mt-4'>
                <Form.Label> <strong>Type Question : </strong></Form.Label>
                <Form.Control 
                  as='select'
                  onChange={(e) => handleChangeType(e)}
                  required >
                  <option defaultValue="choix multiple"  disabled >Choisir...</option>
                  <option value="choix multiple">Choix Multiple</option>
                  <option value="choix unique">Choix Unique</option>
                </Form.Control>
              </Form.Group>

              <Form.Label className='mt-4'> <strong>Choix Question : </strong></Form.Label>
              <br></br>
              <Badge bg="danger" className='text-danger'>
                  Si Vous sélectionnez Choix Unique prière de chosir une seule réponse !
                      </Badge> 
                      <Badge bg="danger" className='text-danger'>
                  Veuillez écrire les réponses avant de sélectionnez les justes sinon les réponses seront vide ! 
                      </Badge> 
              <Row>
                <Col>
                <Form.Control 
                className='mt-3'
                  type='text'
                  placeholder='Entrer  Nom '
                  value={choix1}
                  onChange={(e) => setChoix1(e.target.value) }
                  required>
                  </Form.Control>

                </Col>
                <Col>
                  <Form.Check
                  className='mt-4'
                  type='radio'  
                  value={choix1}
                  onChange={(e) => handleChangeNom(e)}   
                  />
                </Col>
              </Row>
              
              <Row>
                <Col>
                <Form.Control 
                className='mt-3'
                  type='text'
                  placeholder='Entrer  Nom '
                  value={choix2}
                  onChange={(e) => setChoix2(e.target.value) }
                  required>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Check
                  className='mt-4'
                  type='radio'  
                  value={choix2}
                  onChange={(e) => handleChangeNom(e)}   
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                <Form.Control 
                className='mt-3'
                  type='text'
                  placeholder='Entrer  Nom '
                  value={choix3}
                  onChange={(e) => setChoix3(e.target.value) }>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Check
                  className='mt-4'
                  type='radio'  
                  value={choix3}
                  onChange={(e) => handleChangeNom(e)}   
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                <Form.Control 
                className='mt-3'
                  type='text'
                  placeholder='Entrer  Nom '
                  value={choix4}
                  onChange={(e) => setChoix4(e.target.value) }>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Check
                  className='mt-4'
                  type='radio'  
                  value={choix4}
                  onChange={(e) => handleChangeNom(e)}   
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                <Form.Control 
                className='mt-3'
                  type='text'
                  placeholder='Entrer  Nom '
                  value={choix5}
                  onChange={(e) => setChoix5(e.target.value) }>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Check
                  className='mt-4'
                  type='radio'  
                  value={choix5}
                  onChange={(e) => handleChangeNom(e)}   
                  />
                </Col>
              </Row>  

              <Form.Group controlId='tempsQuestions' className='mt-4'>
                <Form.Label> <strong>Temps Question : </strong></Form.Label>
                <Form.Control 
                  as='select'
                  onChange={(e) => handleChangeTime(e)} 
                  required>
                  <option defaultValue="15"  disabled >Choisir...</option>
                  <option value="15">15 secondes</option>
                  <option value="20">20 secondes</option>
                  <option value="25">25 secondes</option>
                  <option value="30">30 secondes</option>
                </Form.Control>
              </Form.Group>

              


              <Button type='submit' variant='primary' className='mt-4'>
                Terminer
              </Button>
            </Form>
        </FormContainer>
        </>
    )
}

export default QuestionAddScreen
