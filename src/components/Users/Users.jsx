import React from 'react'

import s from './Users.module.css'
import User from './User/User'
import Preloader from '../common/Preloader/Preloader';

const Users = props => {
    const mapUsers = () => {
        return props.data.list.map(
            user => <User key={user.id} data={user} action={user.followed ? props.unfollowUser: props.followUser} isFollowing={props.isFollowing} />)
    };
    
    return <>
            <h1 className="title">Users</h1>
            {props.data.isFetching ? <Preloader /> : null }
            <div className={s.container}>
                {mapUsers()}
            </div>
        </>
};

export default Users;