import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Dialog.module.css';

type PropsType = {
    id: number
    name: string
}

const Dialog: React.FC<PropsType> = props => {
    return(
        <li>
            <NavLink to={"/messages/" + props.id} className={s.item} activeClassName={s.active}>
                <div className={s.img} />
                <div>{props.name}</div>
            </NavLink>
        </li>
    )
};

export default Dialog;