import React from 'react';
import s from './User.module.css'

const User = (props) => {
    return <div className={s.item}>
                <div className={s.avatar}></div>
                <div className={s.name}>{props.data.fullName}</div>
                <div className={s.status}>{props.data.status}</div>
                <button className="button">{props.data.followed ? 'Unfollow': 'Follow'}</button>
           </div>
}

export default User;