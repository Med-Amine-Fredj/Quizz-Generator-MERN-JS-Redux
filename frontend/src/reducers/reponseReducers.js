import { QUIZZ_LIST_BYCODE_FAIL, QUIZZ_LIST_BYCODE_REQUEST, QUIZZ_LIST_BYCODE_RESET, QUIZZ_LIST_BYCODE_SUCCESS, REPONSE_ADD_FAIL, REPONSE_ADD_REQUEST, REPONSE_ADD_SUCCESS, REPONSE_GET_BY_QUESTIONID_FAIL, REPONSE_GET_BY_QUESTIONID_REQUEST, REPONSE_GET_BY_QUESTIONID_SUCCESS, REPONSE_GET_BY_QUIZZID_FAIL, REPONSE_GET_BY_QUIZZID_REQUEST, REPONSE_GET_BY_QUIZZID_SUCCESS } from "../constants/reponseConstants"




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


export const responseListByQuizzReducer = (state = { responseListByQuizz: [] }, action) => {

    switch(action.type) {
        case REPONSE_GET_BY_QUIZZID_REQUEST:
            return {loading: true,  responseListByQuizz: [], success: false }
        case REPONSE_GET_BY_QUIZZID_SUCCESS:
            return { loading: false, responseListByQuizz: action.payload, success: true } 
        case REPONSE_GET_BY_QUIZZID_FAIL: 
            return{ loading: false, error: action.payload, success: false }
        default: 
            return state

    }
}

export const responseListByQuestionReducer = (state = { responseListByQuestion: [] }, action) => {

    switch(action.type) {
        case REPONSE_GET_BY_QUESTIONID_REQUEST:
            return {loading: true,  responseListByQuestion: [] }
        case REPONSE_GET_BY_QUESTIONID_SUCCESS:
            return { loading: false, responseListByQuizz: action.payload } 
        case REPONSE_GET_BY_QUESTIONID_FAIL: 
            return{ loading: false, error: action.payload }
        default: 
            return state

    }
}