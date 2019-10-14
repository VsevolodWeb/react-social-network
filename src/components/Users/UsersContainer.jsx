import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import Users from './Users';
import {setUsers, setCurrentPage, follow, unfollow, setTotalUsersCount, setIsFetching} from '../../redux/users-reducer'

class UsersContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.data.currentPage}&count=${this.props.data.pageSize}`)
            .then(response => {
                this.props.setTotalUsersCount(response.data.totalCount);
                this.props.setUsers(response.data.items);
                this.props.setIsFetching(false);
        });
    }

    setCurrentPage = (pageId) => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageId}&count=${this.props.data.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setIsFetching(false);
        });
        this.props.setCurrentPage(pageId);
    }

    followUser = (userId) => {
        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {}, {withCredentials: true})
            .then(response => {
                if(response.data.resultCode === 0) {
                    this.props.follow(userId);
                }
            }
        );
    }

    unfollowUser = (userId) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {}, {withCredentials: true})
            .then(response => {
                if(response.data.resultCode === 0) {
                    this.props.unfollow(userId);
                }
            }
        );
    }

    render() {
        return <Users data={this.props.data} setCurrentPage={this.setCurrentPage} followUser={this.followUser} unfollowUser={this.props.unfollowUser} />
    };
}

const mapStateToProps = (state) => {
    return {
        data: state.users
    }
}

export default connect(mapStateToProps, {setUsers, setCurrentPage, setTotalUsersCount, follow, unfollow, setIsFetching})(UsersContainer);