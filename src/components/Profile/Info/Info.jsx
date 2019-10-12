import React from 'react';
import s from './Info.module.css'
import avatar from './avatar.jpg';

const Info = (props) => {
    return (
        <div className={s.info}>
            <div className={s.avatar} style={{ backgroundImage: `url(${avatar})` }}></div>
            <div>
                <h1 className={s.name}>{props.profile.fullName}</h1>
                <div className={s.text}>{props.profile.aboutMe}</div>
            </div>
        </div>
    )
}

export default Info;