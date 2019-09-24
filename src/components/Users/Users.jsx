import React from 'react';
import User from './User/User';
import s from './Users.module.css'
import axios from 'axios';


const Users = (props) => {
    if(!props.data.list.length) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                props.setUsers(response.data.items)
            });
    }

    const users = props.data.list.map(user => <User key={user.id} data={user} action={user.followed ? props.unfollow: props.follow} />)

    return <>
            <h1 className="title">Users</h1>
            <div className={s.container}>{users}</div>
        </>;
}

export default Users;