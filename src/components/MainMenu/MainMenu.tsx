import React, {useEffect, useState} from 'react'
import {Menu} from 'antd'
import {connect} from 'react-redux'
import Friends from './Friends/Friends'
import {AppStateType} from '../../redux/redux-store'
import {UserType} from '../../redux/types/types'
import {NavLink, useHistory} from 'react-router-dom'
import s from './MainMenu.module.css'

type MapStateToProps = {}
type MapDispatchToProps = {}
type OwnPropsType = {
	users: UserType[]
}
type PropsType = MapStateToProps & MapDispatchToProps & OwnPropsType

const MainMenu: React.FC<PropsType> = (props) => {
	const history = useHistory()
	const [selectedKeyMenu, setSelectedKeyMenu] = useState<string>('')
	let friends = props.users.filter((item) => item.followed)

	useEffect(() => {
		setSelectedKeyMenu(history.location.pathname.substring(1))
	}, [history.location.pathname])

	return (
		<>
			<Menu
				mode="inline"
				className={s.menu}
				selectedKeys={[selectedKeyMenu]}
			>
				<Menu.Item key={'profile'}>
					<NavLink to="/profile">My profile</NavLink>
				</Menu.Item>
				<Menu.Item key={'messages'}>
					<NavLink to="/messages">Messages</NavLink>
				</Menu.Item>
				<Menu.Item key={'users'}>
					<NavLink to="/users">Users</NavLink>
				</Menu.Item>
			</Menu>
			{friends.length ? <Friends friends={friends}/> : ''}
		</>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		users: state.users.list
	}
}

export default connect(mapStateToProps)(MainMenu)