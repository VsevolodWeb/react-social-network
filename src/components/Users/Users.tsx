import React from 'react'
import {useSelector} from "react-redux";
import User from './User/User'
import Preloader from '../common/Preloader/Preloader';
import UsersSearchForm from './UsersSearchForm/UsersSearchForm'
import {followThunkCreator, unfollowThunkCreator} from '../../redux/users-reducer'
import {getUsers, getUsersIsFollowingArray} from "../../redux/users-selectors";
import s from './Users.module.css'

type PropsType = {
	isFetching: boolean
}

const Users: React.FC<PropsType> = props => {
	const list = useSelector(getUsers),
		isFollowingArray = useSelector(getUsersIsFollowingArray)

	return <>
		<h1 className="title">Users</h1>
		{props.isFetching ? <Preloader/> : null}
		<UsersSearchForm/>
		<div className={s.container}>
			{list.map(user => <User key={user.id} user={user} action={user.followed ? unfollowThunkCreator: followThunkCreator} isFollowingArray={isFollowingArray} />)}
		</div>
	</>
};

export default Users;