import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import Users from './Users';
import {setUsersActionCreator, setCurrentPageActionCreator,
        followActionCreator, unfollowActionCreator, setTotalUsersCountActionCreator} from '../../redux/users-reducer'
import loading from './loading.gif'

class UsersContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.data.currentPage}&count=${this.props.data.pageSize}`)
            .then(response => {
                this.props.setTotalUsersCount(response.data.totalCount)
                this.props.setUsers(response.data.items)
        });
    }

    setCurrentPage = (pageId) => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageId}&count=${this.props.data.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
        });
        this.props.setCurrentPage(pageId);
    }


    render() {
        return (
            <>
                {/* <img src={loading} alt="loading" /> */}
                <Users data={this.props.data} setCurrentPage={this.setCurrentPage} follow={this.props.follow} unfollow={this.props.unfollow} />
            </>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        data: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUsers: (users) => {
            dispatch(setUsersActionCreator(users));
        },
        setCurrentPage: (value) => {
            dispatch(setCurrentPageActionCreator(value));
        },
        setTotalUsersCount: (totalUsersCount) => {
            dispatch(setTotalUsersCountActionCreator(totalUsersCount));
        },
        follow: (id) => {
            dispatch(followActionCreator(id));
        },
        unfollow: (id) => {
            dispatch(unfollowActionCreator(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);