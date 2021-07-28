import axios from 'axios'
import { QUIZZ_LIST_REQUEST, QUIZZ_LIST_SUCCESS, QUIZZ_LIST_FAIL, QUIZZ_DETAILS_REQUEST, QUIZZ_DETAILS_SUCCESS, QUIZZ_DETAILS_FAIL, QUIZZ_DELETE_REQUEST, QUIZZ_DELETE_SUCCESS, QUIZZ_DELETE_FAIL, QUESTION_LIST_REQUEST, QUESTION_LIST_SUCCESS, QUESTION_LIST_FAIL, QUESTION_DELETE_REQUEST, QUESTION_DELETE_SUCCESS, QUESTION_DELETE_FAIL, QUIZZ_ADD_REQUEST, QUIZZ_ADD_SUCCESS, QUIZZ_ADD_RESET, QUIZZ_ADD_FAIL, QUIZZ_UPDATE_REQUEST, QUIZZ_UPDATE_SUCCESS, QUIZZ_UPDATE_RESET, QUIZZ_UPDATE_FAIL, QUIZZ_START_REQUEST, QUIZZ_START_SUCCESS, QUIZZ_START_FAIL, QUIZZ_STOP_REQUEST, QUIZZ_STOP_SUCCESS, QUIZZ_STOP_FAIL, QUESTION_ADD_REQUEST, QUESTION_ADD_SUCCESS, QUESTION_ADD_RESET, QUESTION_ADD_FAIL, QUESTION_DELETE_ALL_REQUEST, QUESTION_DELETE_ALL_FAIL, QUESTION_DELETE_ALL_SUCCESS, QUESTION_GETBYID_REQUEST, QUESTION_GETBYID_SUCCESS, QUESTION_GETBYID_FAIL} from '../constants/quizzConstants'


export const listQuizz = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: QUIZZ_LIST_REQUEST
        })

        


        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/myquizz',config)

        dispatch({
            type: QUIZZ_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: QUIZZ_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const listQuizzDetails = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: QUIZZ_DETAILS_REQUEST
        })

        

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/myquizz/${id}`,config)

        dispatch({
            type: QUIZZ_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: QUIZZ_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const deleteQuizz = (id) => async (dispatch, getState) => {
    try {
        
        dispatch({
            type: QUIZZ_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/myquizz/${id}`,config)

        dispatch({
            type: QUIZZ_DELETE_SUCCESS, 
        })

    } catch (error) {
        dispatch({
            type: QUIZZ_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const getQuestionByQuizzId = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: QUESTION_LIST_REQUEST
        })

        


        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/myquizz/${id}/question`,config)

        dispatch({
            type: QUESTION_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: QUESTION_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const deleteQuestion = (id) => async (dispatch, getState) => {
    try {
        
        dispatch({
            type: QUESTION_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/myquizz/:id/question/${id}`,config)

        dispatch({
            type: QUESTION_DELETE_SUCCESS, 
        })

    } catch (error) {
        dispatch({
            type: QUESTION_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const addQuizz = () => async (dispatch, getState, setState) => {
    try {
        dispatch({
            type: QUIZZ_ADD_REQUEST  
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post('/myquizz/', {}, config)
 
        dispatch({ 
            type: QUIZZ_ADD_SUCCESS, 
            payload: data
        })
        dispatch({ type: QUIZZ_ADD_RESET })
    } catch (error) {
        const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: QUIZZ_ADD_FAIL,
      payload: message,
    })
  }
}

export const updateQuizz = (quizz) => async (dispatch, getState, setState) => {
    try {
        dispatch({
            type: QUIZZ_UPDATE_REQUEST  
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/myquizz/${quizz._id}`, quizz, config)
 
        dispatch({ 
            type: QUIZZ_UPDATE_SUCCESS, 
            payload: data
        })
        dispatch({ type: QUIZZ_UPDATE_RESET })
    } catch (error) {
        const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: QUIZZ_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const startQuizz = (id) => async (dispatch, getState) => {
    try {
        
        dispatch({
            type: QUIZZ_START_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(`/myquizz/:id/startquizz`, id,config)

        dispatch({
            type: QUIZZ_START_SUCCESS, 
        })

    } catch (error) {
        dispatch({
            type: QUIZZ_START_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const stopQuizz = (id) => async (dispatch, getState) => {
    try {
        
        dispatch({
            type: QUIZZ_STOP_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(`/myquizz/:id/stopquizz`, id,config)

        dispatch({
            type: QUIZZ_STOP_SUCCESS, 
        })

    } catch (error) {
        dispatch({
            type: QUIZZ_STOP_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const addQuestion = (id,titreQuestion, typeQuestion, tempsQuestion, choixQuestion, reponseQuestion ) => async (dispatch, getState, setState) => {
    try {
        dispatch({
            type: QUESTION_ADD_REQUEST  
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(`/myquizz/addquizz/${id}/addquestion`, { id,titreQuestion, typeQuestion, tempsQuestion, choixQuestion, reponseQuestion }, config)

        dispatch({
            type: QUESTION_ADD_SUCCESS, 
        })
        dispatch({ type: QUESTION_ADD_RESET })
    } catch (error) {

        const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: QUESTION_ADD_FAIL,
      payload: message,
    })
  }
}

export const deleteAllQuestion = (id) => async (dispatch, getState) => {
    try {
        
        dispatch({
            type: QUESTION_DELETE_ALL_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/myquizz/${id}/deleteall`,config)

        dispatch({
            type: QUESTION_DELETE_ALL_SUCCESS, 
        })

    } catch (error) {
        dispatch({
            type: QUESTION_DELETE_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const listQuestionDetails = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: QUESTION_GETBYID_REQUEST
        })

        

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/myquizz/:id/question/${id}`,config)

        dispatch({
            type: QUESTION_GETBYID_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: QUESTION_GETBYID_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}