import React from 'react';
import s from './Profile.module.css'
import Banner from './Banner/Banner';
import Info from './Info/Info';
import PostsContainer from './Posts/PostsContainer';

const Profile = (props) => {
    console.log(props)
    return (
        <>
            <h1 className="title">Profile</h1>
            <div className={s.profile}>
                
                <Banner />
                <Info />
                <PostsContainer data={props.state} dispatch={props.dispatch} />
            </div>
        </>
    )
}

export default Profile;