import React from 'react';

import s from './Profile.module.css';
import Banner from './Banner/Banner';
import Info from './Info/Info';
import Posts from './Posts/Posts';
import {PropsType} from "./ProfileContainer";

const Profile = (props: PropsType) => {
    return (
        <>
            <h1 className="title">Profile</h1>
            <div className={s.profile}>
                <Banner />
                <Info {...props.data.userProfile} userStatus={props.data.userStatus}
                        updateUserStatus={props.updateUserStatus} loginUserId={props.userId}
                        updateUserPhoto={props.updateUserPhoto} saveUserProfile={props.saveUserProfile} />
                <Posts data={props.data.postsData} addPost={props.addPost} resetForm={props.resetForm} />
            </div>
        </>
    )
};

export default Profile;