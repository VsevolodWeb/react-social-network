import React from 'react'
import {Avatar, Button} from 'antd'
import {Link} from 'react-router-dom'
import logo from './logo.svg'
import s from './MainHeader.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {authLogout} from '../../redux/auth-reducer'
import {getAuthIsAuth, getAuthUserLogin} from '../../redux/auth-selectors'
import {getUserProfilePhotos} from '../../redux/profile-selectors'

const MainHeader = () => {
	const login = useSelector(getAuthUserLogin)
	const isAuth = useSelector(getAuthIsAuth)
	const photos = useSelector(getUserProfilePhotos)
	const dispatch = useDispatch()

	const logoutLink = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault()
		dispatch(authLogout())
	}

	return (
		<div className={s.header}>
			<Link to="/">
				<img src={logo} alt="My Social Work" className={s.logo}/>
			</Link>
			<div className={s.login}>
				{isAuth && (
					<>
						<Avatar size="large" src={photos?.small}>
							{login}
						</Avatar>
						<div className={s.login__name}>{login}</div>
						<Button
							size="small"
							onClick={logoutLink}
						>
							Logout
						</Button>
					</>
				)}
			</div>
		</div>
	)
}

export default MainHeader