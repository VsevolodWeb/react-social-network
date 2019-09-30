import React from 'react';
import User from './User/User';
import axios from 'axios';


class Users extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.data.currentPage}&count=${this.props.data.pageSize}`)
            .then(response => {
                this.props.setTotalUsersCount(response.data.totalCount)
                this.props.setUsers(response.data.items)
        });
    }

    mapUsers() {
        return this.props.data.list.map(user => <User key={user.id} data={user} action={user.followed ? this.props.unfollow: this.props.follow} />)
    };

    setCurrentPage(pageId) {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageId}&count=${this.props.data.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
        });
        this.props.setCurrentPage(pageId);
    }

    render() {
        return <Users />
    };
}

export default Users;