import React from 'react';
import {connect} from 'react-redux';

import Users from './Users';
import {setCurrentPage, followThunkCreator, unfollowThunkCreator,
        setIsFollowing, getUsersThunkCreator} from '../../redux/users-reducer'

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.data.currentPage, this.props.data.pageSize);
    }

    setCurrentPage = (pageId) => {
        this.props.getUsers(pageId, this.props.data.pageSize);
        this.props.setCurrentPage(pageId);
    }
    
    render() {
        return <Users data={this.props.data} setCurrentPage={this.setCurrentPage}
                followUser={this.props.follow} unfollowUser={this.props.unfollow} isFollowing={this.props.data.isFollowing} />
    };
}

const mapStateToProps = (state) => {
    return {
        data: state.users
    }
}

export default connect(mapStateToProps, {
    setCurrentPage,
    follow: followThunkCreator, unfollow: unfollowThunkCreator, getUsers: getUsersThunkCreator,
    setIsFollowing
})(UsersContainer);