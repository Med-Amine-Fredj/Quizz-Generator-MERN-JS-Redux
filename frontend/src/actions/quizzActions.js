import axios from 'axios'
import { QUIZZ_LIST_REQUEST, QUIZZ_LIST_SUCCESS, QUIZZ_LIST_FAIL, QUIZZ_DETAILS_REQUEST, QUIZZ_DETAILS_SUCCESS, QUIZZ_DETAILS_FAIL, QUIZZ_DELETE_REQUEST, QUIZZ_DELETE_SUCCESS, QUIZZ_DELETE_FAIL, QUESTION_LIST_REQUEST, QUESTION_LIST_SUCCESS, QUESTION_LIST_FAIL, QUESTION_DELETE_REQUEST, QUESTION_DELETE_SUCCESS, QUESTION_DELETE_FAIL, QUIZZ_ADD_REQUEST, QUIZZ_ADD_SUCCESS, QUIZZ_ADD_RESET, QUIZZ_ADD_FAIL, QUIZZ_UPDATE_REQUEST, QUIZZ_UPDATE_SUCCESS, QUIZZ_UPDATE_RESET, QUIZZ_UPDATE_FAIL} from '../constants/quizzConstants'


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

