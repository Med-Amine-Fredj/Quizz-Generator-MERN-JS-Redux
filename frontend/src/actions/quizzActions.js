import axios from 'axios'
import { QUIZZ_LIST_REQUEST, QUIZZ_LIST_SUCCESS, QUIZZ_LIST_FAIL, QUIZZ_DETAILS_REQUEST, QUIZZ_DETAILS_SUCCESS, QUIZZ_DETAILS_FAIL} from '../constants/quizzConstants'


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