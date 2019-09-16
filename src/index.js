import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux'

import App from './App.jsx';
import store from './redux/redux-store';

let rerenderEntireTree = (state) => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider dispatch={store.dispatch.bind(store)}>
                <App data={state} />
            </Provider>
        </BrowserRouter>
        , document.getElementById('root'));
}

rerenderEntireTree(store.getState());

store.subscribe(() => {
    rerenderEntireTree(store.getState());
});