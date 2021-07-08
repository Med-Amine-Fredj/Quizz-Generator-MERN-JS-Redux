import { GROUPE_ADD_FAIL, GROUPE_ADD_REQUEST, GROUPE_ADD_RESET, GROUPE_ADD_SUCCESS, GROUPE_DELETE_FAIL, GROUPE_DELETE_REQUEST, GROUPE_DELETE_SUCCESS, GROUPE_LIST_FAIL, 
    GROUPE_LIST_REQUEST, 
    GROUPE_LIST_RESET, 
    GROUPE_LIST_SUCCESS } 
from "../constants/groupConstants"




export const groupesListReducers = (state = { groupes: []}, action) => {

    switch(action.type) {
        case GROUPE_LIST_REQUEST:
            return { loading: true, groupes: []}
        case GROUPE_LIST_SUCCESS:
            return { loading: false, groupes: action.payload } 
        case GROUPE_LIST_FAIL: 
            return{ loading: false, error: action.payload }
        case GROUPE_LIST_RESET: 
            return { groupes: []}
        default: 
            return state
    }
}

export const groupeDeleteReducer = (state = {}, action) => {

    switch(action.type) {
        case GROUPE_DELETE_REQUEST:
            return { loading: true }
        case GROUPE_DELETE_SUCCESS:
            return { loading: false,  sucess: true } 
        case GROUPE_DELETE_FAIL: 
            return{ loading: false, error: action.payload }
        default: 
            return state

    }
}


export const groupeAddReducer = (state = { }, action) => {

    switch(action.type) {
        case GROUPE_ADD_REQUEST:
            return { loading: true }
        case GROUPE_ADD_SUCCESS:
            return { loading: false, sucess: true } 
        case GROUPE_ADD_FAIL: 
            return{ loading: false, error: action.payload }
        case GROUPE_ADD_RESET: 
            return { sucess: false }
        default: 
            return state

    }
}