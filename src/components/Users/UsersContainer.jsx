import React from 'react';
import {connect} from 'react-redux';

import Users from './Users';
import {setUsers, setCurrentPage, follow, unfollow, setTotalUsersCount, setIsFetching, setIsFollowing} from '../../redux/users-reducer'
import { getUsers, followUserAPI, unfollowUserAPI } from '../../api/api';

class UsersContainer extends React.Component {
    componentDidMount() {
        getUsers(this.props.data.currentPage, this.props.data.pageSize).then(response => {
            this.props.setTotalUsersCount(response.totalCount);
            this.props.setUsers(response.items);
            this.props.setIsFetching(false);
        });
    }

    setCurrentPage = (pageId) => {
        getUsers(pageId, this.props.data.pageSize).then(response => {
                this.props.setUsers(response.items);
                this.props.setIsFetching(false);
        });
        this.props.setCurrentPage(pageId);
    }

    followUser = (userId) => {
        this.props.setIsFollowing(userId, true);

        followUserAPI(userId).then(response => {
            if(response.resultCode === 0) {
                this.props.follow(userId);
                this.props.setIsFollowing(userId, false);
            }
        });
    }

    unfollowUser = (userId) => {
        this.props.setIsFollowing(userId, true);

        unfollowUserAPI(userId).then(response => {
            if(response.resultCode === 0) {
                this.props.unfollow(userId);
                this.props.setIsFollowing(userId, false);
            }
        });
    }

    render() {
        console.log(this.props.data)
        return <Users data={this.props.data} setCurrentPage={this.setCurrentPage}
                followUser={this.followUser} unfollowUser={this.unfollowUser} isFollowing={this.props.data.isFollowing} />
    };
}

const mapStateToProps = (state) => {
    return {
        data: state.users
    }
}

export default connect(mapStateToProps, {setUsers, setCurrentPage, setTotalUsersCount, follow, unfollow, setIsFetching, setIsFollowing})(UsersContainer);