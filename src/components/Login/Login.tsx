import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import {authLoginThunkCreator, AuthLoginFormDataType, authMeThunkCreator} from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
	isAuth: boolean
	captchaURL: string | null
}
type MapDispatchToProps = {
	authLogin: (formData: AuthLoginFormDataType) => void
	authMe: () => void
}
type OwnType = {}
type PropsType = MapStateToPropsType & MapDispatchToProps & OwnType;

const Login: React.FC<PropsType> = props => {
    const loginSubmit = (formData: any) => {
        props.authLogin(formData);
    };

    return !props.isAuth ? (<>
            <h1 className="title">Login</h1>
            <div>
                <LoginForm onSubmit={loginSubmit} captchaURL={props.captchaURL} />
            </div>
    </>) : <Redirect to="/profile" />
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaURL: state.security.captchaURL
});

export default connect<MapStateToPropsType, MapDispatchToProps, OwnType, AppStateType>(mapStateToProps,
    {authLogin: authLoginThunkCreator, authMe: authMeThunkCreator}
    )(Login);