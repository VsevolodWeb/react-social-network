import React, {useState} from 'react';
import s from './Info.module.css'
import avatar from './avatar.jpg';
import StatusWithHooks from './Status/StatusWithHooks';
import Data from './Data/Data';
import DataForm from './DataForm/DataForm';

const Info = props => {
    let imgSource = "";
    let editingAbility = props.loginUserId === props.userId;
    let [editModeProfile, setEditModeProfile] = useState(false);

    try {
        imgSource = props.photos.large;
    } catch {}

    const onPhotoSelected = e => {
        props.updateUserPhoto(e.target.files[0]);
    };

    const dataFormSubmit = formData => {
       //console.log(formData);
       setEditModeProfile(false);
    };

    const changeEditModeProfile = () => {
        setEditModeProfile(!editModeProfile);
    }

    return (
        <div className={s.info}>
            <div className={s.avatarWrapper}>
                <div className={s.avatar} style={{ backgroundImage: `url(${imgSource || avatar})` }} />
                {editingAbility ? <input className="button" type="file" onChange={onPhotoSelected} /> : null}
            </div>
            <div>
                <h1 className={s.name}>{props.fullName}</h1>
                {props.userStatus ? <StatusWithHooks status={props.userStatus} editingAbility={editingAbility}
                                                    updateUserStatus={props.updateUserStatus} /> : null}
            </div>
            <div className={s.text}>
                
                {editModeProfile ?
                    <DataForm onSubmit={dataFormSubmit} aboutMe={props.aboutMe} contacts={props.contacts} initialValues={{aboutMe: "asd"}}
                            lookingForAJob={props.lookingForAJob} lookingForAJobDescription={props.lookingForAJobDescription}/> :
                    <>
                        <button className="button" onClick={changeEditModeProfile}>Edit</button>
                        <Data aboutMe={props.aboutMe} contacts={props.contacts} lookingForAJob={props.lookingForAJob}
                        l   ookingForAJobDescription={props.lookingForAJobDescription} />
                    </>
                }
            </div>
        </div>
    )
};

export default Info;