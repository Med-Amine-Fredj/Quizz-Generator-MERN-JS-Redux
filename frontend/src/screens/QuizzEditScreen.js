import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listQuizzDetails, updateQuizz } from '../actions/quizzActions'
import { QUIZZ_UPDATE_RESET } from '../constants/quizzConstants'



const QuizzEditScreen = ({ match, history }) => {

    const dispatch = useDispatch()

    const quizzId = match.params.id

    const [nomQuizz, setNomQuizz] = useState('')
    const [descriptionQuizz, setDescQuizz] = useState('')
    const [imageQuizz, setImageQuizz] = useState('')
    const [uploading, setUploading] = useState(false)

    const quizzDetails = useSelector(state => state.quizzDetails)
    const {loading, error, lequizz} = quizzDetails

    const quizzUpdate = useSelector(state => state.quizzUpdate)
    const {loading: loadingUpdate, error: errorUpdate, sucess: sucessUpdate} = quizzUpdate


    useEffect(() => {
      if(sucessUpdate) {
        dispatch(listQuizzDetails(quizzId))
        dispatch({
          type: QUIZZ_UPDATE_RESET
        })
        history.push('/admin/myquizz')
      } else {
          if(!lequizz.nomQuizz || lequizz._id !== quizzId ) {
            dispatch(listQuizzDetails(quizzId))
        } else {
            setNomQuizz(lequizz.nomQuizz)
            setDescQuizz(lequizz.descriptionQuizz)
            setImageQuizz(lequizz.imageQuizz)
        }
      }

    }, [dispatch, lequizz, quizzId, sucessUpdate, history])

    const uploadFileHandler = async(e) => {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      setUploading(true)

      try {
        const config = {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        }

        const { data } = await axios.post('/upload', formData, config)

        setImageQuizz(data)
        setUploading(false)
      } catch (error) {
        console.error(error)
        setUploading(false)
      }
    }


    const submitHandler =(e) => {
        e.preventDefault()
        dispatch(updateQuizz({
          _id: quizzId,
          nomQuizz,
          descriptionQuizz,
          imageQuizz
        }))
    }



    return (
        <>
        <Link to='/admin/myquizz' className='btn btn-primary my-3'>
        Go Back
        </Link>
        <FormContainer>
        <h1 className='text-center mb-3'><strong> Editer Quizz</strong> </h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
            <Form  onSubmit={submitHandler}>
              <Form.Group controlId='nomQuizz' className='mt-4'>
                <Form.Label>Nom Quizz : </Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Entrer Nom '
                  value={nomQuizz}
                  onChange={(e) => setNomQuizz(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='descriptionQuizz' className='mt-4'>
                <Form.Label>Description Quizz : </Form.Label>
                <Form.Control
                  as="textarea"
                  type='text'
                  placeholder='Entrer Description'
                  value={descriptionQuizz}
                  onChange={(e) => setDescQuizz(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='imageQuizz' className='mt-4'>
                <Form.File >
                    <Form.File.Label>Image Quizz :</Form.File.Label>
                    <Form.File.Input 
                    onChange={uploadFileHandler}
                    style={{width: '100%'}}
                    className="form-control mt-3"
                    />
                    {uploading && <Loader /> }
                  </Form.File>
              </Form.Group>


              <Button type='submit' variant='primary' className='mt-4'>
                Terminer
              </Button>
            </Form>
        )}
        </FormContainer>

        </>
    )
}

export default QuizzEditScreen
