import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

import {reducer as formReduser} from 'redux-form';
import dialogsReducer from './dialogs-reducer'
import profileReducer from './profile-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer from './users-reducer'
import authReducer from "./auth-reducer";

const reducers = combineReducers({
    auth: authReducer,
    dialogs: dialogsReducer,
    profile: profileReducer,
    sidebar: sidebarReducer,
    users: usersReducer,
    form: formReduser
    
});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;