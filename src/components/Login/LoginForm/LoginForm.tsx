import React from 'react';
import {reduxForm, Field, InjectedFormProps} from 'redux-form';

import { Input } from '../../common/FormsControls/FormsControls';
import { required } from '../../../utils/validators';
import s from'./LoginForm.module.css';
import {AuthLoginFormDataType} from "../../../redux/auth-reducer";

type OwnPropsType = {
	captchaURL: string | null
}

type PropsType = InjectedFormProps<AuthLoginFormDataType, OwnPropsType> & OwnPropsType

const LoginForm: React.FC<PropsType> = props => {
    return (
        <div className={s.container}>
            <form onSubmit={props.handleSubmit}>
                <div className="form">
                    <Field component={Input} name="email" placeholder="Login" validate={[required]} />
                    <Field component={Input} name="password" type="password" placeholder="Password" validate={[required]} />
                    <div className="formGroup">
                        <label htmlFor="remember-me">
                            <Field component="input" name="rememberMe" type="checkbox" id="remember-me" /> Remember me
                        </label>
                    </div>
                    {props.error ? <div className="formGroup">
                        <span className="formGroup__errorText">{props.error}</span>
                    </div> : null}
                    {props.captchaURL ?
                        <>
                            <img src={props.captchaURL} alt="captcha" width="150"/>
                            <Field component={Input} name="captcha" validate={[required]}/>
                        </>
                        : null}
                    <div className="formGroup">
                        <button className="button">Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default reduxForm<AuthLoginFormDataType, OwnPropsType>({
    form: 'login'
})(LoginForm);