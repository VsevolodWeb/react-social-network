import { createStore, combineReducers } from "redux";

import dialogsReducer from './dialogs-reducer'
import profileReducer from './profile-reducer'
import sidebarReducer from './sidebar-reducer'

const reducers = combineReducers({dialogsReducer, profileReducer, sidebarReducer});
const store = createStore(reducers);

export default store;