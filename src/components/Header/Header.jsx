import React from 'react';
import logo from './logo.svg';
import s from './Header.module.css'

const Header = () => {
    return(
        <header className={s.header}>
            <div className="container">
            <img src={logo} alt="My Social Work" className={s.logo} />
            </div>
        </header>
    )
}

export default Header