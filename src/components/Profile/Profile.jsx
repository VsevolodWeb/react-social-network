import React from 'react';

import s from './Profile.module.css';
import Banner from './Banner/Banner';
import Info from './Info/Info';
import Posts from './Posts/Posts';
import Preloader from '../common/Preloader/Preloader';

const Profile = (props) => {
    let userProfile = props.data.userProfile;

    if(!userProfile) {
        return <Preloader />
    }

    return (
        <>
            <h1 className="title">Profile</h1>
            <div className={s.profile}>
                <Banner />
                <Info profile={userProfile} />
                <Posts newPostValue={props.data.newPostValue} data={props.data.postsData}
                    updateNewPost={props.updateNewPost} addPost={props.addPost} />
            </div>
        </>
    )
}

export default Profile;