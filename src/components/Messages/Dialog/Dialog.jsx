import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Dialog.module.css';


const Dialog = props => {
    return(
        <li>
            <NavLink to={"/messages/" + props.id} className={s.item} activeClassName={s.active}>
                <div className={s.img} alt={props.name} />
                <div>{props.name}</div>
            </NavLink>
        </li>
    )
};

export default Dialog;