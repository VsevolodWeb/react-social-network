import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from './logo.svg';
import s from './Header.module.css'

const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={s.container + " container"}>
                <img src={logo} alt="My Social Work" className={s.logo} />
                <div className={s.login}>
                    {(props.isAuth) ? (
                        <>
                            <div className={s.loginName}>{props.login}</div>
                            <NavLink to="/logout" className={s.link}>Logout</NavLink>
                        </>
                    ) : <NavLink to="/login" className={s.link}>Login</NavLink>}
                </div>
            </div>
        </header>
    )
}

export default Header