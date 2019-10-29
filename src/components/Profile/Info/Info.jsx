import React from 'react';
import s from './Info.module.css'
import avatar from './avatar.jpg';
import Status from './Status/Status';

const Info = (props) => {
    return (
        <div className={s.info}>
            <div className={s.avatar} style={{ backgroundImage: `url(${avatar})` }}></div>
            <div>
                <h1 className={s.name}>{props.fullName}</h1>
                {props.userStatus ? <Status text={props.userStatus} editingAbility={props.loginUserId === props.userId} /> : null}
            </div>
            <div className={s.text}>
                {props.aboutMe ? <><b>About me:</b> {props.aboutMe}</>: ""}
            </div>
        </div>
    )
}

export default Info;