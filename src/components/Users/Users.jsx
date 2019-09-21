import React from 'react';
import User from './User/User';
import s from './Users.module.css'

const Users = (props) => {
    const users = props.data.list.map(user => <User key={user.id} data={user} follow={props.follow} unfollow={props.unfollow} />)

    return <>
            <h1 className="title">Users</h1>
            <div className={s.container}>{users}</div>
        </>;
}

export default Users;