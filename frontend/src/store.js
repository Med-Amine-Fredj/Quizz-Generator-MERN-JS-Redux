import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { quizzListReducers, 
    quizzDetailsReducers, 
    quizzDeleteReducer, 
    questionListReducer,
    questionDeleteOneReducer, 
    quizzAddReducer, 
    quizzUpdateReducer, 
    quizzStartReducer, 
    quizzStopReducer, 
    questionAddReducer, 
    questionDeleteAllReducer} 
    from './reducers/quizzReducers'
import { userLoginReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, 
    userUpdateReducer, userAddReducer, userOnlineList } from './reducers/userReducers'
import {groupesListReducers, groupeDeleteReducer, groupeAddReducer, groupDetailsReducer, groupUpdateReducer,} from './reducers/groupReducers'

const reducer = combineReducers({
    quizzList: quizzListReducers,
    quizzDetails: quizzDetailsReducers,
    quizzDelete: quizzDeleteReducer,
    questionList: questionListReducer,
    questionAdd:questionAddReducer,
    questionDeleteOne: questionDeleteOneReducer,
    questionDeleteAll: questionDeleteAllReducer,
    quizzAdd: quizzAddReducer,
    quizzUpdate: quizzUpdateReducer,
    quizzStart: quizzStartReducer,
    quizzStop: quizzStopReducer,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userAdd: userAddReducer,
    usersOnline: userOnlineList,
    groupesList: groupesListReducers,
    groupeDelete: groupeDeleteReducer,
    groupeAdd: groupeAddReducer,
    groupDetails: groupDetailsReducer,
    groupUpdate: groupUpdateReducer,
    

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