import React from 'react';

import s from './Profile.module.css'
import Banner from './Banner/Banner';
import Info from './Info/Info';
import Posts from './Posts/Posts'

const Profile = (props) => {
    console.log(props)
    return (
        <>
            <h1 className="title">Profile</h1>
            <div className={s.profile}>
                <Banner />
                <Info profile={props.data.profile} userProfile={props.data.userProfile} />
                <Posts newPostValue={props.data.newPostValue} data={props.data.postsData}
                    updateNewPost={props.updateNewPost} addPost={props.addPost} />
            </div>
        </>
    )
}

export default Profile;