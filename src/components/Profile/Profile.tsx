import React from 'react';

import s from './Profile.module.css';
import Banner from './Banner/Banner';
import Info from './Info/Info';
import Posts from './Posts/Posts';

type PropsType = {
    setUserIdParam: (userId: string) => void
}

const Profile: React.FC<PropsType> = props => {
    return (
        <>
            <h1 className="title">Profile</h1>
            <div className={s.profile}>
                <Banner />
                <Info setUserIdParam={props.setUserIdParam} />
                <Posts/>
            </div>
        </>
    )
}

export default Profile;