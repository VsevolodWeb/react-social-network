import React from 'react';

import s from './Profile.module.css';
import Banner from './Banner/Banner';
import Info from './Info/Info';
import Posts from './Posts/Posts';
import Preloader from '../common/Preloader/Preloader';

const Profile = (props) => {
    let urlUserId = props.match.params.userId;
    let storeUserProfile = props.data.userProfile;
    let profileInfo;

    if(urlUserId) {
        profileInfo = props.data.userProfile;
        if((urlUserId && !storeUserProfile) || (storeUserProfile.userId !== parseInt(urlUserId))) {
            return <Preloader />
        }
    } else {
        profileInfo = props.data.profile;
    }

    return (
        <>
            <h1 className="title">Profile</h1>
            <div className={s.profile}>
                <Banner />
                <Info profile={profileInfo} />
                <Posts newPostValue={props.data.newPostValue} data={props.data.postsData}
                    updateNewPost={props.updateNewPost} addPost={props.addPost} />
            </div>
        </>
    )
}

export default Profile;