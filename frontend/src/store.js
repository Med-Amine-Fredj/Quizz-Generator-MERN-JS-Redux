import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { quizzListReducers, quizzDetailsReducers  } from './reducers/quizzReducers'
import { userLoginReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, 
    userUpdateReducer, userAddReducer, userOnlineList } from './reducers/userReducers'

const reducer = combineReducers({
    quizzList: quizzListReducers,
    quizzDetails: quizzDetailsReducers,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userAdd: userAddReducer,
    usersOnline: userOnlineList
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin : {
        userInfo: userInfoFromStorage
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store 