import React from 'react';
import {reduxForm, Field} from 'redux-form';

const LoginForm = props => {
    console.log(props)
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form">
                <div className="formGroup">
                    <Field component="input" name="login" placeholder="Login" className="input" />
                </div>
                <div className="formGroup">
                    <Field component="input" name="password" type="password" placeholder="Password" className="input" />
                </div>
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
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

export default LoginReduxForm;