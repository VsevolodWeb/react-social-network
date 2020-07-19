import React from 'react'

import s from './Users.module.css'
import User from './User/User'
import Preloader from '../common/Preloader/Preloader';
import {UserType} from "../../redux/types/types";
import UsersSearchForm from './UsersSearchForm/UsersSearchForm'
import {UsersFilterType} from '../../redux/users-reducer'

type PropsType = {
	list: Array<UserType>
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
    isFollowingArray: Array<number>
    onFilterChanged: (filter: UsersFilterType) => void
    setCurrentPage: (pageId: number) => void
    isFetching: boolean
    filter: UsersFilterType
}

const Users: React.FC<PropsType> = props => {
    return <>
        <h1 className="title">Users</h1>
        {props.isFetching ? <Preloader/> : null}
        <UsersSearchForm onFilterChanged={props.onFilterChanged} filter={props.filter} setCurrentPage={props.setCurrentPage}/>
        <div className={s.container}>
            {props.list.map(user => <User key={user.id} user={user} action={user.followed ? props.unfollowUser: props.followUser} isFollowingArray={props.isFollowingArray} />)}
        </div>
    </>
};

export default Users;