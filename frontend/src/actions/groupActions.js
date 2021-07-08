import axios from 'axios'
import { GROUPE_ADD_FAIL, GROUPE_ADD_REQUEST, GROUPE_ADD_RESET, GROUPE_ADD_SUCCESS, GROUPE_DELETE_FAIL, GROUPE_DELETE_REQUEST, GROUPE_DELETE_SUCCESS, GROUPE_LIST_FAIL, 
    GROUPE_LIST_REQUEST, 
    GROUPE_LIST_SUCCESS } 
from '../constants/groupConstants'


export const listGroupe = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: GROUPE_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/groupes',config)

        dispatch({
            type: GROUPE_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: GROUPE_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const deleteGroupe = (id) => async (dispatch, getState) => {
    try {
        
        dispatch({
            type: GROUPE_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/groupes/${id}`,config)

        dispatch({
            type: GROUPE_DELETE_SUCCESS, 
        })

    } catch (error) {
        dispatch({
            type: GROUPE_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const addGroup = (nomGroupe, descriptionGroupe, nomMembres, emailMembres ) => async (dispatch, getState, setState) => {
    try {
        dispatch({
            type: GROUPE_ADD_REQUEST  
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put('/groupes/addgroup', { nomGroupe, descriptionGroupe, nomMembres, emailMembres }, config)

        dispatch({
            type: GROUPE_ADD_SUCCESS, 
        })
        dispatch({ type: GROUPE_ADD_RESET })
    } catch (error) {

        const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: GROUPE_ADD_FAIL,
      payload: message,
    })
  }
}