import React from 'react'

import s from './Users.module.css'
import User from './User/User'
import Preloader from '../common/Preloader/Preloader';

const Users = props => {
    return <>
        <h1 className="title">Users</h1>
        {props.isFetching ? <Preloader /> : null }
        <div className={s.container}>
            {props.list.map(user => <User key={user.id} user={user} action={user.followed ? props.unfollowUser: props.followUser} isFollowing={props.isFollowing} />)}
        </div>
    </>
};

export default Users;