import React from 'react';

import s from './Profile.module.css'
import Banner from './Banner/Banner';
import Info from './Info/Info';
import PostsContainer from './Posts/PostsContainer';

const Profile = (props) => {
    return (
        <>
            <h1 className="title">Profile</h1>
            <div className={s.profile}>
                
                <Banner />
                <Info />
                <DispatchContext.Consumer>
                    {value => <PostsContainer data={props.state} dispatch={value} />}
                </DispatchContext.Consumer>
            </div>
        </>
    )
}

export default Profile;