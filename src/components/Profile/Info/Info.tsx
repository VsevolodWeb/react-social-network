import React, {ChangeEvent, useState} from 'react';
import s from './Info.module.css'
import avatar from './avatar.jpg';
import StatusWithHooks from './Status/StatusWithHooks';
import Data from './Data/Data';
import DataForm from './DataForm/DataForm';
import {ProfileType} from "../../../redux/types/types";
import {useDispatch, useSelector} from 'react-redux'
import {getUserId, getUserPhoto} from '../../../redux/profile-selectors'
import {getAuthUserId} from '../../../redux/auth-selectors'
import {saveUserProfileThunkCreator, setUserPhotoThunkCreator} from '../../../redux/profile-reducer'


type PropsType = {
    userProfile: Partial<ProfileType> | (ProfileType & Partial<ProfileType>)
    userStatus: string
    updateUserStatus: (status: string) => void
    loginUserId: number | null
    updateUserPhoto: (photo: File) => void
    saveUserProfile: (userInfo: ProfileType) => Promise<any>
}

const Info: React.FC<PropsType> = props => {
    const userPhoto = useSelector(getUserPhoto)
    const userId = useSelector(getUserId)
    const authUserId = useSelector(getAuthUserId)
    const dispatch = useDispatch()

    let editingAbility = authUserId === userId
    let [editModeProfile, setEditModeProfile] = useState(false);

    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length) {
            dispatch(setUserPhotoThunkCreator(e.target.files[0]))
        }
    };

    const dataFormSubmit = (formData: ProfileType) => {
        dispatch(saveUserProfileThunkCreator(formData))
        props.saveUserProfile().then(() => {

        }, () => {});
    };

    const changeEditModeProfile = () => {
        setEditModeProfile(!editModeProfile);
    };

    return (
        <div className={s.info}>
            <div className={s.avatarWrapper}>
                <div className={s.avatar} style={{ backgroundImage: `url(${userPhoto || avatar})` }} />
                {editingAbility ? <input className="button" type="file" onChange={onPhotoSelected} /> : null}
            </div>
            <div>
                <h1 className={s.name}>{props.userProfile?.fullName}</h1>
                {props.userStatus ? <StatusWithHooks status={props.userStatus} editingAbility={editingAbility}
                                                    updateUserStatus={props.updateUserStatus} /> : null}
            </div>
            <div className={s.text}>
                {editingAbility ? <button className={"button " + s.button} onClick={changeEditModeProfile}>Edit</button> : null}
                {editModeProfile ?
                    <DataForm onSubmit={dataFormSubmit} initialValues={props.userProfile} /> :
                    <>
                        <Data contacts={props.userProfile?.contacts} lookingForAJob={props.userProfile?.lookingForAJob}
                            lookingForAJobDescription={props.userProfile?.lookingForAJobDescription} aboutMe={props.userProfile?.aboutMe} />
                    </>
                }
            </div>
        </div>
    )
};

export default Info;