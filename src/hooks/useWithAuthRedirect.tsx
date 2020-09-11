import React from 'react'
import {useSelector} from 'react-redux'
import {getAuthIsAuth} from '../redux/auth-selectors'
import {Redirect} from 'react-router-dom'

type UseWithAuthRedirectType = () => false | JSX.Element

const useWithAuthRedirect: UseWithAuthRedirectType = () => {
	const isAuth = useSelector(getAuthIsAuth)

	return isAuth && <Redirect to="/login"/>
}

export default useWithAuthRedirect