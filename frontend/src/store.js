import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { quizzListReducers, quizzDetailsReducers  } from './reducers/quizzReducers'

const reducer = combineReducers({
    quizzList: quizzListReducers,
    quizzDetails: quizzDetailsReducers
    
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store 