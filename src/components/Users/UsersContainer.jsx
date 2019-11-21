import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import Users from './Users';
import Pagination from "./Pagination/Pagination";
import { setCurrentPage, followThunkCreator, unfollowThunkCreator,
        setIsFollowing, getUsersThunkCreator } from '../../redux/users-reducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getUsers } from '../../redux/users-selectors';


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.data.currentPage, this.props.data.pageSize);
    }

    setCurrentPage = (pageId) => {
        this.props.getUsers(pageId, this.props.data.pageSize);
        this.props.setCurrentPage(pageId);
    };
    
    render() {
        return <>
            <Users data={this.props.data} followUser={this.props.follow} unfollowUser={this.props.unfollow} isFollowing={this.props.data.isFollowing} />
            <Pagination setCurrentPage={this.setCurrentPage} currentPage={this.props.data.currentPage} totalUsersCount={this.props.data.totalUsersCount} pageSize={this.props.data.pageSize} />
        </>
    };
}

const mapStateToProps = (state) => ({
    data: getUsers(state)
});


export default compose(
    connect(mapStateToProps, {
        setCurrentPage,
        follow: followThunkCreator, unfollow: unfollowThunkCreator, getUsers: getUsersThunkCreator,
        setIsFollowing
    }),
    withAuthRedirect
)(UsersContainer);