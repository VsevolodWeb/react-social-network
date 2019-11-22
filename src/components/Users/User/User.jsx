import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './User.module.css'

const User = props => {
    return <div className={s.item}>
                <NavLink to={`profile/${props.user.id}`}>
                    <span className={s.avatar} />
                </NavLink>
                <div className={s.name}>{props.user.name}</div>
                <div className={s.status}>{props.user.status}</div>
                <button className={s.button + " button"} onClick={() => props.action(props.user.id)} disabled={props.isFollowing.some(el => el === props.user.id) ? 'disabled': ''}>
                    {props.user.followed ? 'Unfollow': 'Follow'}
                </button>
           </div>
};

export default User;