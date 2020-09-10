import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import { Redirect } from 'react-router-dom';

import {AuthLoginFormDataType} from "../../api/auth-api";
import {useDispatch, useSelector} from "react-redux";
import {authLoginThunkCreator} from "../../redux/auth-reducer";
import {getAuthIsAuth} from "../../redux/auth-selectors";


export const Login: React.FC = () => {
	const isAuth = useSelector(getAuthIsAuth)
	const dispatch = useDispatch()

    const loginSubmit = (formData: AuthLoginFormDataType) => {
        dispatch(authLoginThunkCreator(formData))
    };

    return !isAuth ? (<>
            <h1 className="title">Login</h1>
            <div>
                <LoginForm onSubmit={loginSubmit}/>
            </div>
    </>) : <Redirect to="/profile" />
};