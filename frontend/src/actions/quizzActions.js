import axios from 'axios'
import { QUIZZ_LIST_REQUEST, QUIZZ_LIST_SUCCESS, QUIZZ_LIST_FAIL} from '../constants/quizzConstants'


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