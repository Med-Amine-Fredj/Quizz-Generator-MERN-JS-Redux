import axios from 'axios'
import { QUIZZ_LIST_REQUEST, QUIZZ_LIST_SUCCESS, QUIZZ_LIST_FAIL, QUIZZ_DETAILS_REQUEST, QUIZZ_DETAILS_SUCCESS, QUIZZ_DETAILS_FAIL, QUIZZ_DELETE_REQUEST, QUIZZ_DELETE_SUCCESS, QUIZZ_DELETE_FAIL, QUESTION_LIST_REQUEST, QUESTION_LIST_SUCCESS, QUESTION_LIST_FAIL} from '../constants/quizzConstants'


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