import React from 'react';
import User from './User/User';
import s from './Users.module.css'
import axios from 'axios';


class Users extends React.Component {
    mapUsers() {
        return this.props.data.list.map(user => <User key={user.id} data={user} action={user.followed ? this.props.unfollow: this.props.follow} />)
    };

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                this.props.setUsers(response.data.items)
        });
    }

    render() {
        return <>
                <h1 className="title">Users</h1>
                <div className={s.container}>{this.mapUsers()}</div>
            </>
    };
}

export default Users;