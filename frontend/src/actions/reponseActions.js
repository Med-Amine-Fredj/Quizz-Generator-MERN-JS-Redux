import axios from 'axios'
import { QUIZZ_LIST_BYCODE_FAIL, QUIZZ_LIST_BYCODE_REQUEST, QUIZZ_LIST_BYCODE_SUCCESS } from '../constants/reponseConstants'

export const getQuizzByCode = (codeQuizz) => async (dispatch, getState, setState) => {
    try {
        dispatch({
            type: QUIZZ_LIST_BYCODE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }


        const { data } = await axios.get(`/reponse/${codeQuizz}` ,config )
 
        dispatch({ 
            type: QUIZZ_LIST_BYCODE_SUCCESS, 
            payload: data
        })
    } catch (error) {
        const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: QUIZZ_LIST_BYCODE_FAIL,
      payload: message,
    })
  }
}
