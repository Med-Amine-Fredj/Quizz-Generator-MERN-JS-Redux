import { QUIZZ_LIST_REQUEST, QUIZZ_LIST_SUCCESS, QUIZZ_LIST_FAIL} from '../constants/quizzConstants'



export const quizzListReducers = (state = { quizz: []}, action) => {

    switch(action.type) {
        case QUIZZ_LIST_REQUEST:
            return { loading: true, quizz: []}
        case QUIZZ_LIST_SUCCESS:
            return { loading: false, quizz: action.payload } 
        case QUIZZ_LIST_FAIL: 
            return{ loading: false, error: action.payload }
        default: 
            return state

    }



}