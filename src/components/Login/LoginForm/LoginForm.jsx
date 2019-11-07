import React from 'react';
import {reduxForm, Field} from 'redux-form';
import { Input } from '../../common/FormsControls/FormsControls';
import s from'./LoginForm.module.css'

const LoginForm = props => {
    return (
        <div className={s.container}>
            <form onSubmit={props.handleSubmit}>
                <div className="form">
                    <Field component={Input} name="email" placeholder="Login" required />
                    <Field component={Input} name="password" type="password" placeholder="Password" required />
                    <div className="formGroup">
                        <label htmlFor="remember-me">
                            <Field component="input" name="rememberMe" type="checkbox" id="remember-me" /> Remember me
                        </label>
                    </div>
                    <div className="formGroup">
                        <button className="button">Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default reduxForm({
        form: 'login'
    })(LoginForm);