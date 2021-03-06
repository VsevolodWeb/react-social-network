import React from 'react';
import {reduxForm, InjectedFormProps} from 'redux-form';

import {CustomField, FieldNames, Input} from '../../common/FormsControls/FormsControls';
import { required } from '../../../utils/validators';
import s from'./LoginForm.module.css';
import {AuthLoginFormDataType} from "../../../api/auth-api";
import {useSelector} from "react-redux";
import {getSecurityCaptchaURL} from "../../../redux/security-selectors";

export type OwnPropsType = {}
type FieldNameType = FieldNames<AuthLoginFormDataType>
type PropsType = InjectedFormProps<AuthLoginFormDataType, OwnPropsType> & OwnPropsType

export const LoginForm: React.FC<PropsType> = props => {
    const captchaURL = useSelector(getSecurityCaptchaURL)

    return (
        <div className={s.container}>
            <form onSubmit={props.handleSubmit}>
                <div className="form">
                    <CustomField<FieldNameType> component={Input} name="email" placeholder="Login" validate={[required]} />
                    <CustomField<FieldNameType> component={Input} name="password" type="password" placeholder="Password" validate={[required]} />
                    <div className="formGroup">
                        <label htmlFor="remember-me">
                            <CustomField<FieldNameType> component="input" name="rememberMe" type="checkbox" id="remember-me"/> Remember me
                        </label>
                    </div>
                    {props.error ? <div className="formGroup">
                        <span className="formGroup__errorText">{props.error}</span>
                    </div> : null}
                    {captchaURL ?
                        <>
                            <img src={captchaURL} alt="captcha" width="150"/>
                            <CustomField<FieldNameType> component={Input} name="captcha" validate={[required]}/>
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