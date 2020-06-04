import React, {ChangeEvent, useState} from 'react';
import s from './Info.module.css'
import avatar from './avatar.jpg';
import StatusWithHooks from './Status/StatusWithHooks';
import Data from './Data/Data';
import DataForm from './DataForm/DataForm';
import {ProfileType} from "../../../redux/types/types";


type PropsType = ProfileType & {
    userStatus: string
    updateUserStatus: (status: string) => void
    loginUserId: number | null
    aboutMe: string
    updateUserPhoto: (photo: File) => void
    saveUserProfile: (userInfo: ProfileType) => Promise<any>
}

const Info: React.FC<PropsType> = props => {
    let imgSource: string | null = "";
    let editingAbility = props.loginUserId === props.userId;
    let [editModeProfile, setEditModeProfile] = useState(false);

    try {
        imgSource = props.photos.large;
    } catch {}

    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length) {
            props.updateUserPhoto(e.target.files[0]);
        }
    };

    const dataFormSubmit = (formData: ProfileType) => {
        props.saveUserProfile(formData).then(() => {
            setEditModeProfile(false);
        });
    };

    const changeEditModeProfile = () => {
        setEditModeProfile(!editModeProfile);
    };

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
                {editingAbility ? <button className={"button " + s.button} onClick={changeEditModeProfile}>Edit</button> : null}
                {editModeProfile ?
                    <DataForm onSubmit={dataFormSubmit} contacts={props.contacts}
                            lookingForAJob={props.lookingForAJob} lookingForAJobDescription={props.lookingForAJobDescription} aboutMe={props.aboutMe} /> :
                    <>
                        <Data contacts={props.contacts} lookingForAJob={props.lookingForAJob}
                            lookingForAJobDescription={props.lookingForAJobDescription} aboutMe={props.aboutMe} />
                    </>
                }
            </div>
        </div>
    )
};

export default Info;