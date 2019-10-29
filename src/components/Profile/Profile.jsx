import React from 'react';

import s from './Profile.module.css';
import Banner from './Banner/Banner';
import Info from './Info/Info';
import Posts from './Posts/Posts';

const Profile = (props) => {
    return (
        <>
            <h1 className="title">Profile</h1>
            <div className={s.profile}>
                <Banner />
                <Info {...props.data.userProfile} userStatus={props.data.userStatus} loginUserId={props.userId} />
                <Posts newPostValue={props.data.newPostValue} data={props.data.postsData}
                    updateNewPost={props.updateNewPost} addPost={props.addPost} />
            </div>
        </>
    )
}

export default Profile;