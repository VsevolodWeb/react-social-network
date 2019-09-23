import React from 'react';
import User from './User/User';
import s from './Users.module.css'



const Users = (props) => {
    if(!props.data.list.length) {
        props.setUsers([{
            id: 1,
            fullName: 'Volodya Smirnov',
            location: {city: 'Velikie Luki', country: 'Russia'},
            status: 'Lorem ipsum',
            followed: true
        },
        {
            id: 2,
            fullName: 'Anastasia Ivanova',
            location: {city: 'Chicago', country: 'USA'},
            status: 'Lorem ipsum',
            followed: true
        },
        {
            id: 3,
            fullName: 'Vladimir Kutin',
            location: {city: 'New York', country: 'USA'},
            status: 'Lorem ipsum',
            followed: true
        },
        {
            id: 4,
            fullName: 'Hero Petrov',
            location: {city: 'Vitebsk', country: 'Belarus'},
            status: 'Lorem ipsum',
            followed: false
        },
        {
            id: 5,
            fullName: 'Ivan Mechnikov',
            location: {city: 'Kiev', country: 'Ukraine'},
            status: 'Lorem ipsum',
            followed: true
        }])
    }

    const users = props.data.list.map(user => <User key={user.id} data={user} action={user.followed ? props.unfollow: props.follow} />)

    return <>
            <h1 className="title">Users</h1>
            <div className={s.container}>{users}</div>
        </>;
}

export default Users;