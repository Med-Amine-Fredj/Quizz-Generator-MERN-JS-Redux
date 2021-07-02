import axios from 'axios'
import { QUIZZ_LIST_REQUEST, QUIZZ_LIST_SUCCESS, QUIZZ_LIST_FAIL, QUIZZ_DETAILS_REQUEST, QUIZZ_DETAILS_SUCCESS, QUIZZ_DETAILS_FAIL} from '../constants/quizzConstants'


export const listQuizz = () => async(dispatch) => {
    try {
        dispatch({
            type: QUIZZ_LIST_REQUEST
        })

        const { data } = await axios.get('/admin/myquizz')

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

export const listQuizzDetails = (id) => async(dispatch) => {
    try {
        dispatch({
            type: QUIZZ_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/admin/myquizz/${id}`)

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