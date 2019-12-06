import React from 'react';
import s from './Info.module.css'
import avatar from './avatar.jpg';
import StatusWithHooks from './Status/StatusWithHooks';

const Info = props => {
    let imgSource = "";
    try {
        imgSource = props.photos.large;
    } catch {}

    let editingAbility = props.loginUserId === props.userId;

    const onPhotoSelected = e => {
        props.updateUserPhoto(e.target.files[0]);
    };


    return (
        <div className={s.info}>
            <div className={s.avatarWrapper}>
                <div className={s.avatar} style={{ backgroundImage: `url(${imgSource || avatar})` }} />
                {editingAbility ? <input className="button" type="file" onChange={onPhotoSelected} /> : null}
            </div>
            <div>
                <h1 className={s.name}>{props.fullName}</h1>
                {props.userStatus ? <StatusWithHooks status={props.userStatus} editingAbility={editingAbility} updateUserStatus={props.updateUserStatus} /> : null}
            </div>
            <div className={s.text}>
                {props.aboutMe ? <><b>About me:</b> {props.aboutMe}</>: ""}
            </div>
        </div>
    )
};

export default Info;