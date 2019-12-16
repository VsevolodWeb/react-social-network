import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk'

import {reducer as formReducer} from 'redux-form';
import dialogsReducer from './dialogs-reducer'
import profileReducer from './profile-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer from './users-reducer'
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import securityReducer from "./security-reducer";

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
    }),
    security: securityReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

export default store;