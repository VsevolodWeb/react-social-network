import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import Users from './Users';
import Pagination from "../common/Pagination/Pagination";
import {
    setCurrentPage, followThunkCreator, unfollowThunkCreator,
    setIsFollowing, getUsersThunkCreator, UsersInitialStateType
} from '../../redux/users-reducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getUsers } from '../../redux/users-selectors';
import {AppStateType} from "../../redux/redux-store";

type PropsType = {
    data: UsersInitialStateType
    setCurrentPage: (pageId: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.data.currentPage, this.props.data.pageSize);
    }

    setCurrentPage = (pageId: number) => {
        this.props.getUsers(pageId, this.props.data.pageSize);
        this.props.setCurrentPage(pageId);
    };
    
    render() {
        return <>
            <Users list={this.props.data.list} followUser={this.props.follow} unfollowUser={this.props.unfollow} isFollowingArray={this.props.data.isFollowing} isFetching={this.props.data.isFetching} />
            <Pagination setCurrentPage={this.setCurrentPage} currentPage={this.props.data.currentPage} totalCount={this.props.data.totalUsersCount} pageSize={this.props.data.pageSize} />
        </>
    };
}

const mapStateToProps = (state: AppStateType) => ({
    data: getUsers(state)
});


export default compose(
    connect(mapStateToProps, {
        setCurrentPage,
        follow: followThunkCreator, unfollow: unfollowThunkCreator, getUsers: getUsersThunkCreator,
        setIsFollowing
    }), withAuthRedirect
)(UsersContainer);