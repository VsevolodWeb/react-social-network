import React from 'react'
import {useSelector} from 'react-redux'
import Profile from './Profile'
import Preloader from '../common/Preloader/Preloader'
import useWithAuthRedirect from '../../hooks/useWithAuthRedirect'
import {getProfileIsFetching} from '../../redux/profile-selectors'

type PropsType = {
    setUserIdParam: (userId: string) => void
}

export const ProfileContainer: React.FC<PropsType> = props => {
    const isFetching = useSelector(getProfileIsFetching)
    const isRedirect = useWithAuthRedirect()

    return isFetching ? <Preloader/> : isRedirect || <Profile setUserIdParam={props.setUserIdParam}/>
}