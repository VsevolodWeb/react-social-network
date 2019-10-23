import React from 'react';
import s from './Info.module.css'
import avatar from './avatar.jpg';
import Status from './Status/Status';

const Info = (props) => {
    return (
        <div className={s.info}>
            <div className={s.avatar} style={{ backgroundImage: `url(${avatar})` }}></div>
            <div>
                <h1 className={s.name}>{props.profile.fullName}</h1>
                <div><Status /></div>
            </div>
            <div className={s.text}>
                {props.profile.aboutMe ? <><b>About me:</b> {props.profile.aboutMe}</>: ""}
            </div>
        </div>
    )
}

export default Info;