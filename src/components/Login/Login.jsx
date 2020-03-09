import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import { authLoginThunkCreator, authMeThunkCreator } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Login = props => {
    const loginSubmit = formData => {
        props.authLogin(formData);
    };

    return !props.isAuth ? (<>
            <h1 className="title">Login</h1>
            <div>
                <LoginForm onSubmit={loginSubmit} captchaURL={props.captchaURL} />
            </div>
    </>) : <Redirect to="/profile" />
};

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    captchaURL: state.security.captchaURL
});

export default connect(mapStateToProps,
    {authLogin: authLoginThunkCreator, authMe: authMeThunkCreator}
    )(Login);