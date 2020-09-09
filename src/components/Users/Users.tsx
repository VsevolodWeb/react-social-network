import React from 'react'
import {useSelector} from "react-redux";

import s from './Users.module.css'
import User from './User/User'
import Preloader from '../common/Preloader/Preloader';
import UsersSearchForm from './UsersSearchForm/UsersSearchForm'
import {UsersFilterType} from '../../redux/users-reducer'
import {getUsers, getUsersFilter, getUsersIsFetching, getUsersIsFollowingArray} from "../../redux/users-selectors";


type PropsType = {
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
    onFilterChanged: (filter: UsersFilterType) => void
    setCurrentPage: (pageId: number) => void
}

const Users: React.FC<PropsType> = props => {

    const list = useSelector(getUsers),
        isFollowingArray = useSelector(getUsersIsFollowingArray),
        isFetching = useSelector(getUsersIsFetching)

    return <>
        <h1 className="title">Users</h1>
        {isFetching ? <Preloader/> : null}
        <UsersSearchForm/>
        <div className={s.container}>
            {list.map(user => <User key={user.id} user={user} action={user.followed ? props.unfollowUser: props.followUser} isFollowingArray={isFollowingArray} />)}
        </div>
    </>
};

export default Users;