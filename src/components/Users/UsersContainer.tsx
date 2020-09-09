import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'

import Users from './Users'
import Pagination from '../common/Pagination/Pagination'
import {
    followThunkCreator,
    unfollowThunkCreator,
    getUsersThunkCreator,
    InitialStateType,
    actions, UsersFilterType
} from '../../redux/users-reducer'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {AppStateType} from '../../redux/redux-store'
import Preloader from '../common/Preloader/Preloader'

type MapStateToPropsType = {
    data: InitialStateType
}

type MapDispatchToPropsType = {
    setCurrentPage: (pageId: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number, filter: UsersFilterType) => void
}

type OwnType = {}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnType;

type UsersPageType = MapDispatchToPropsType

const UsersPage: React.FC<UsersPageType> = ({follow, unfollow, setCurrentPage}) => {
    const onFilterChanged = (filter: UsersFilterType) => {
        const {pageSize} = this.props.data
        this.props.getUsers(1, pageSize, filter)
    }

    return props.data.isFetching ? <Preloader/> :
        <>
            <Users followUser={this.props.follow} unfollowUser={this.props.unfollow}
                   onFilterChanged={this.onFilterChanged} setCurrentPage={this.setCurrentPage}
            />
            <Pagination setCurrentPage={this.setCurrentPage} currentPage={this.props.data.currentPage}
                        totalCount={this.props.data.totalUsersCount} pageSize={this.props.data.pageSize}/>
        </>
    />
}

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.data.currentPage, this.props.data.pageSize, this.props.data.filter)
    }

    setCurrentPage = (pageId: number) => {
        this.props.getUsers(pageId, this.props.data.pageSize, this.props.data.filter)
        this.props.setCurrentPage(pageId)
    }


    render() {
        return this.props.data.isFetching ? <Preloader/> :
            <>
                <Users followUser={this.props.follow}
                       unfollowUser={this.props.unfollow}
                       setCurrentPage={this.setCurrentPage}
                />
                <Pagination setCurrentPage={this.setCurrentPage} currentPage={this.props.data.currentPage}
                            totalCount={this.props.data.totalUsersCount} pageSize={this.props.data.pageSize}/>
            </>
    };
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    data: state.users
})

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnType, AppStateType>(mapStateToProps, {
        setCurrentPage: actions.setCurrentPage,
        follow: followThunkCreator, unfollow: unfollowThunkCreator, getUsers: getUsersThunkCreator
    }),
    withAuthRedirect
)(UsersContainer)