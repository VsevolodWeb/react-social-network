import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './User.module.css'

const User = props => {
    const toggleFollow = () => {
        props.action(props.data.id);
    };

    return <div className={s.item}>
                <NavLink to={`profile/${props.data.id}`}>
                    <span className={s.avatar} />
                </NavLink>
                <div className={s.name}>{props.data.name}</div>
                <div className={s.status}>{props.data.status}</div>
                <button className={s.button + " button"} onClick={toggleFollow}
                    disabled={props.isFollowing.some(el => el === props.data.id) ? 'disabled': ''}
                >
                    {props.data.followed ? 'Unfollow': 'Follow'}
                </button>
           </div>
};

export default User;