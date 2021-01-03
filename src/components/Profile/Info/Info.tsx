import React, {useState} from 'react'
import {Button, Upload} from 'antd'
import avatar from './avatar.jpg'
import StatusWithHooks from './Status/StatusWithHooks'
import Data from './Data/Data'
import DataForm from './DataForm/DataForm'
import {ProfileType} from '../../../redux/types/types'
import {useDispatch, useSelector} from 'react-redux'
import {getUserProfile, getUserStatus} from '../../../redux/profile-selectors'
import {getAuthUserId} from '../../../redux/auth-selectors'
import {saveUserProfileThunkCreator, setUserPhotoThunkCreator} from '../../../redux/profile-reducer'
import {UploadOutlined} from '@ant-design/icons'
import s from './Info.module.css'
import {UploadChangeParam, UploadFile} from 'antd/lib/upload/interface'

const Info = () => {
    const userProfile = useSelector(getUserProfile)
    const userStatus = useSelector(getUserStatus)
    const authUserId = useSelector(getAuthUserId)
    const dispatch = useDispatch()

    let editingAbility = authUserId === userProfile?.userId
    let [editModeProfile, setEditModeProfile] = useState(false)

    const onPhotoSelected = (info: UploadChangeParam<UploadFile<File>>) => {
        if (info.file.originFileObj) {
            dispatch(setUserPhotoThunkCreator(info.file.originFileObj as File))
        }
    }

    const dataFormSubmit = (formData: ProfileType) => {
        dispatch(saveUserProfileThunkCreator(formData))
        setEditModeProfile(false)
    }

    const changeEditModeProfile = () => {
        setEditModeProfile(!editModeProfile)
    }

    return (
        <div className={s.info}>
            <div className={s.avatarWrapper}>
                <div className={s.avatar} style={{backgroundImage: `url(${userProfile?.photos.large || avatar})`}}/>
                {editingAbility ? <Upload onChange={onPhotoSelected} showUploadList={false}>
                    <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                </Upload> : null}
            </div>
            <div>
                <h1 className={s.name}>{userProfile?.fullName}</h1>
                {userStatus ? <StatusWithHooks status={userStatus} editingAbility={editingAbility}/> : null}
            </div>
            <div className={s.text}>
                {editingAbility ?
                    <Button className={s.button} type="primary" onClick={changeEditModeProfile}>Edit</Button> : null}
                    {userProfile && (editModeProfile ?
                        <DataForm onSubmit={dataFormSubmit} initialValues={userProfile}/> :
                        <>
                            <Data userProfile={userProfile}/>
                        </>)
                    }
            </div>
        </div>
    )
}

export default Info