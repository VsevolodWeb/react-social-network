import React from 'react';
import s from './Info.module.css'
import avatar from './avatar.jpg';
import StatusWithHooks from './Status/StatusWithHooks';

const Info = props => {
    let imgSource = "";
    try {
        imgSource = props.photos.large;
    } catch {}


    return (
        <div className={s.info}>
            <div className={s.avatar} style={{ backgroundImage: `url(${imgSource || avatar})` }} />
            <div>
                <h1 className={s.name}>{props.fullName}</h1>
                {props.userStatus ? <StatusWithHooks status={props.userStatus} editingAbility={props.loginUserId === props.userId} updateUserStatus={props.updateUserStatus} /> : null}
            </div>
            <div className={s.text}>
                {props.aboutMe ? <><b>About me:</b> {props.aboutMe}</>: ""}
            </div>
        </div>
    )
};

export default Info;