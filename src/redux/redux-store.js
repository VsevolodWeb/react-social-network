import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

import {reducer as formReducer} from 'redux-form';
import dialogsReducer from './dialogs-reducer'
import profileReducer from './profile-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer from './users-reducer'
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";

import {RESET_FORM} from './actions/actions'

const reducers = combineReducers({
    auth: authReducer,
    dialogs: dialogsReducer,
    profile: profileReducer,
    sidebar: sidebarReducer,
    users: usersReducer,
    app: appReducer,
    form: formReducer.plugin({
        addMessage: (state, action) => {
            switch(action.type) {
                case RESET_FORM:
                    return undefined;
                default:
                    return state;
            }
        },
        addPost: (state, action) => {
            switch(action.type) {
                case RESET_FORM:
                    return undefined;
                default:
                    return state;
            }
        }
    })
    
});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;