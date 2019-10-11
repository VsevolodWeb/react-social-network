import React from 'react';
import s from './Info.module.css'
import avatar from './avatar.jpg';

const Info = (props) => {
    const checkUserProfile = (value) => {
        if(props.userProfile) {
            return props.userProfile[value];
        } else {
            return props.profile[value];
        }
    }

    return (
        <div className={s.info}>
            <div className={s.avatar} style={{ backgroundImage: `url(${avatar})` }}></div>
            <div>
                <h1 className={s.name}>{checkUserProfile("fullName")}</h1>
                <div className={s.text}>{checkUserProfile("aboutMe")}</div>
            </div>
        </div>
    )
}

export default Info;