import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from './logo.svg';
import s from './Header.module.css'

const Header = (props) => {
    console.log(props)
    return (
        <header className={s.header}>
            <div className={s.container + " container"}>
                <img src={logo} alt="My Social Work" className={s.logo} />
                <div className={s.login}>
                    <div className={s.loginName}>{props.data.login}</div>
                    <NavLink to="/login" className={s.link}>Logout</NavLink>
                </div>
            </div>
        </header>
    )
}

export default Header