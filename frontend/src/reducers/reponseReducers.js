import { QUIZZ_LIST_BYCODE_FAIL, QUIZZ_LIST_BYCODE_REQUEST, QUIZZ_LIST_BYCODE_RESET, QUIZZ_LIST_BYCODE_SUCCESS, REPONSE_ADD_FAIL, REPONSE_ADD_REQUEST, REPONSE_ADD_SUCCESS } from "../constants/reponseConstants"




export const quizzByCodeReducers = (state = { quizzCode: {} }, action) => {

    switch(action.type) {
        case QUIZZ_LIST_BYCODE_REQUEST:
            return { loading: true, quizzByCode: {}}
        case QUIZZ_LIST_BYCODE_SUCCESS:
            return { loading: false, quizzCode: action.payload, success: true } 
        case QUIZZ_LIST_BYCODE_FAIL: 
            return{ loading: false, error: action.payload }
        case QUIZZ_LIST_BYCODE_RESET: 
            return{success: false, quizzCode: action.payload }
        default: 
            return state
    }
}

export const reponseAddReducer = (state = { }, action) => {

    switch(action.type) {
        case REPONSE_ADD_REQUEST:
            return { loading: true }
        case REPONSE_ADD_SUCCESS:
            return { loading: false, sucess: true } 
        case REPONSE_ADD_FAIL: 
            return{ loading: false, error: action.payload }
        default: 
            return state

    }
}
