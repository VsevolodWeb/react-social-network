import React from 'react';
import {connect} from 'react-redux';

import Users from './Users';
import {setUsers, setCurrentPage, follow, unfollow, setTotalUsersCount, setIsFetching} from '../../redux/users-reducer'
import { getUsers, followUserAPI, unfollowUserAPI } from '../../api/api';

class UsersContainer extends React.Component {
    componentDidMount() {
        getUsers(this.props.data.currentPage, this.props.data.pageSize).then(response => {
            this.props.setTotalUsersCount(response.data.totalCount);
            this.props.setUsers(response.data.items);
            this.props.setIsFetching(false);
        });
    }

    setCurrentPage = (pageId) => {
        getUsers(pageId, this.props.data.pageSize).then(response => {
                this.props.setUsers(response.data.items);
                this.props.setIsFetching(false);
        });
        this.props.setCurrentPage(pageId);
    }

    followUser = (userId) => {
        followUserAPI(userId).then(response => {
            if(response.data.resultCode === 0) {
                this.props.follow(userId);
            }
        });
    }

    unfollowUser = (userId) => {
        unfollowUserAPI(userId).then(response => {
            if(response.data.resultCode === 0) {
                this.props.unfollow(userId);
            }
        });
    }

    render() {
        return <Users data={this.props.data} setCurrentPage={this.setCurrentPage} followUser={this.followUser} unfollowUser={this.unfollowUser} />
    };
}

const mapStateToProps = (state) => {
    return {
        data: state.users
    }
}

export default connect(mapStateToProps, {setUsers, setCurrentPage, setTotalUsersCount, follow, unfollow, setIsFetching})(UsersContainer);