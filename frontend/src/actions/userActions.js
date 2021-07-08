import axios from 'axios'
import { GROUPE_LIST_RESET } from '../constants/groupConstants'
import { USER_ADD_FAIL, USER_ADD_REQUEST, USER_ADD_RESET, USER_ADD_SUCCESS, USER_DELETE_FAIL, 
    USER_DELETE_REQUEST, 
    USER_DELETE_SUCCESS,
     USER_DETAILS_FAIL, 
     USER_DETAILS_REQUEST, 
     USER_DETAILS_RESET, 
     USER_DETAILS_SUCCESS,
      USER_LIST_FAIL, 
      USER_LIST_REQUEST,
       USER_LIST_RESET, 
       USER_LIST_SUCCESS, 
       USER_LOGIN_FAIL, 
       USER_LOGIN_REQUEST, 
       USER_LOGIN_SUCCESS, 
       USER_LOGOUT, 
       USER_ONLINE_FAIL, 
       USER_ONLINE_REQUEST, 
       USER_ONLINE_RESET, 
       USER_ONLINE_SUCCESS, 
       USER_UPDATE_FAIL, 
       USER_UPDATE_PROFILE_FAIL, 
       USER_UPDATE_PROFILE_REQUEST, 
       USER_UPDATE_PROFILE_RESET, 
       USER_UPDATE_PROFILE_SUCCESS, 
       USER_UPDATE_REQUEST,
       USER_UPDATE_SUCCESS
    } from "../constants/userConstants"

export const login = (emailUtilisateur, mdp ) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers:   {
                'Content-Type': 'application/json' 
            }
        }

        const { data } = await axios.post('/users/login', { emailUtilisateur, mdp }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS, 
            payload: data,
        })
        
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const logout = (user) => async  (dispatch) => {

    const config = {
        headers:   {
            'Content-Type': 'application/json' ,
        }
    }

    await axios.put('/logout', user, config)

    localStorage.removeItem('userInfo')

    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_UPDATE_PROFILE_RESET })
    dispatch({ type: USER_LIST_RESET })
    dispatch({ type: USER_ONLINE_RESET })
    dispatch({ type: GROUPE_LIST_RESET })
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                'Content-Type': 'application/json' ,
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/users/${id}`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS, 
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                'Content-Type': 'application/json' ,
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/users/profile`, user,  config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS, 
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        
        dispatch({
            type: USER_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/users`,config)

        dispatch({
            type: USER_LIST_SUCCESS, 
            payload: data,
        })

    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not Authorized ! You Have To Connect With Admin' ) {
        dispatch(logout())
      }
      dispatch({
        type: USER_LIST_FAIL,
        payload: message,
      })
    }
}


export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/users/${id}`,config)

        dispatch({
            type: USER_DELETE_SUCCESS, 
        })

    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const updateUser = (user) => async (dispatch, getState) => {
    try {
        
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/users/${user._id}`, user, config)

        dispatch({ type: USER_UPDATE_SUCCESS,  })
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
        dispatch({ type: USER_DETAILS_RESET })

    } catch (error) {
   const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not Authorized ! You Have To Connect With Admin' ) {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const addUser = (nomUtilisateur, emailUtilisateur, mdp, isAdmin ) => async (dispatch, getState, setState) => {
    try {
        dispatch({
            type: USER_ADD_REQUEST  
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.post('/users/adduser', { nomUtilisateur, emailUtilisateur, mdp, isAdmin }, config)

        dispatch({
            type: USER_ADD_SUCCESS, 
        })
        dispatch({ type: USER_ADD_RESET })
    } catch (error) {

        const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not Authorized ! You Have To Connect With Admin' ) {
      dispatch(logout())
    }
    dispatch({
      type: USER_ADD_FAIL,
      payload: message,
    })
  }
}


export const getUserOnline= () => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_ONLINE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:   {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/users/enligne', config)

        dispatch({
            type: USER_ONLINE_SUCCESS, 
            payload: data,
        })
    } catch (error) {
            const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not Authorized ! You Have To Connect With Admin' ) {
            dispatch(logout())
        }
        dispatch({
            type: USER_ONLINE_FAIL,
            payload: message,
        })
        }
}