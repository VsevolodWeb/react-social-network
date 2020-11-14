import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

import {getUserProfileThunkCreator, getUserStatusThunkCreator} from '../../redux/profile-reducer'
import Profile from './Profile'
import Preloader from '../common/Preloader/Preloader'
import useWithAuthRedirect from '../../hooks/useWithAuthRedirect'
import {getAuthUserId} from '../../redux/auth-selectors'
import {getProfileIsFetching} from '../../redux/profile-selectors'


export const ProfileContainer: React.FC = () => {
	const authUserId = useSelector(getAuthUserId),
		isFetching = useSelector(getProfileIsFetching)
	const dispatch = useDispatch()
	const {userIdParam} = useParams()
	const isRedirect = useWithAuthRedirect()

	useEffect(() => {
		let resultUserId = userIdParam ? parseInt(userIdParam) : authUserId;
		if(resultUserId) {
			dispatch(getUserProfileThunkCreator(resultUserId))
			dispatch(getUserStatusThunkCreator(resultUserId))
		}
	}, [dispatch, userIdParam, authUserId])

	return isFetching ? <Preloader/> : isRedirect || <Profile/>
}