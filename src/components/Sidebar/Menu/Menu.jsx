import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Menu.module.css'


const Menu = () => {
    return (
        <ul className={s.list}>
            <li className={s.item}>
                <NavLink to="/profile" className={s.link} activeClassName={s.active}>My profile</NavLink>
            </li>
            <li className={s.item}>
                <NavLink to="/messages" className={s.link} activeClassName={s.active}>Messages</NavLink>
            </li>
            <li className={s.item}>
                <NavLink to="/users" className={s.link} activeClassName={s.active}>Users</NavLink>
            </li>
        </ul>
    )
}

export default Menu;