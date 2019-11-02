import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import { authLoginThunkCreator, authMeThunkCreator } from '../../redux/auth-reducer';
import { connect } from 'react-redux';

const Login = props => {
    const loginSubmit = formData => {
        props.authLogin(formData);
    }
    return (
        <>
            <h1 className="title">Login</h1>
            <div>
                <LoginForm onSubmit={loginSubmit} />
            </div>
        </>
    )
}

export default connect(null, {authLogin: authLoginThunkCreator, authMe: authMeThunkCreator})(Login);