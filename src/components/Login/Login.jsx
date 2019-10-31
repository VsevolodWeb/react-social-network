import React from 'react';
import s from './Login.module.css'

const Login = () => {
    return (
        <>
            <h1 className="title">Login</h1>
            <div className={s.login}>
                <div className="form">
                    <div className="formGroup">
                        <input type="text" placeholder="Login" className="input" />
                    </div>
                    <div className="formGroup">
                        <input type="password" placeholder="Password" className="input" />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="remember-me">
                            <input type="checkbox" id="remember-me" /> Remember me
                        </label>
                    </div>
                    <div className="formGroup">
                        <button className="button">Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;