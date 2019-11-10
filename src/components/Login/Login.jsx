import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import { authLoginThunkCreator, authMeThunkCreator } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

const Login = props => {
    const loginSubmit = formData => {
        props.authLogin(formData);
    }
    return !props.isAuth ? (<>
            <h1 className="title">Login</h1>
            <div>
                <LoginForm onSubmit={loginSubmit} />
            </div>
    </>) : <Redirect to="/profile" />
}

const mapDispatchToProps = state => ({
    isAuth: state.auth.isAuth
})

export default connect(mapDispatchToProps, {authLogin: authLoginThunkCreator, authMe: authMeThunkCreator})(Login);