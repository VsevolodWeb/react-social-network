import React from 'react';
import s from './Info.module.css'
import avatar from './avatar.jpg';

const info = () => {
    return (
        <div className={s.info}>
            <div className={s.avatar} style={{ backgroundImage: `url(${avatar})` }}></div>
            <div className={s.text}>My Info</div>
        </div>
    )
}

export default info;