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

    // if(props.contacts) {
    //     console.log(Object.values(props.contacts).includes(null))
    // }

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
                {props.lookingForAJob ? <div><b>Looking for job</b></div> : null}
                {props.lookingForAJobDescription ? <div><b>My skills</b>: {props.lookingForAJobDescription}</div> : null}
                {props.aboutMe ? <div><b>About me:</b> {props.aboutMe}</div> : null}
                {props.contacts ? <div><b>Contacts:</b> <ul>{Object.keys(props.contacts).map((socialTitle, index) => {
                                                            return props.contacts[index] ? <li>{socialTitle}: {props.contacts[index]}</li> : null
                                                        })}</ul></div> : null}
            </div>
        </div>
    )
};

export default Info;