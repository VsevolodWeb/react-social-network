import React from 'react';
import {reduxForm, Field} from 'redux-form';

import { Input } from '../../common/FormsControls/FormsControls';
import { required } from '../../../utils/validators/index';
import s from'./LoginForm.module.css';

const LoginForm = props => {
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
                    </div> : ""}
                    <div className="formGroup">
                        <button className="button">Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default reduxForm({
    form: 'login'
})(LoginForm);