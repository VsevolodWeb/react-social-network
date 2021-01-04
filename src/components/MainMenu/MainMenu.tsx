import React, {useEffect, useState} from 'react'
import {Menu} from 'antd'
import {useSelector} from 'react-redux'
import {NavLink, useLocation} from 'react-router-dom'
import Friends from './Friends/Friends'
import {getUsers} from '../../redux/users-selectors'
import s from './MainMenu.module.css'

const MainMenu: React.FC = () => {
	const users = useSelector(getUsers)
	const location = useLocation()
	const [selectedKeyMenu, setSelectedKeyMenu] = useState<string>('')
	let friends = users.filter((item) => item.followed)

	useEffect(() => {
		const match = location.pathname.match(/\/([^\\]+)\//)

		if(match) {
			const [, pageTitle] = match
			setSelectedKeyMenu(pageTitle)
		}
	}, [location])

	return (
		<>
			<Menu
				mode="inline"
				className={s.menu}
				selectedKeys={[selectedKeyMenu]}
			>
				<Menu.Item key={'profile'}>
					<NavLink to="/profile/">My profile</NavLink>
				</Menu.Item>
				<Menu.Item key={'messages'}>
					<NavLink to="/messages/">Messages</NavLink>
				</Menu.Item>
				<Menu.Item key={'users'}>
					<NavLink to="/users/">Users</NavLink>
				</Menu.Item>
			</Menu>
			{friends.length ? (
				<div className={s.friends}>
					<Friends friends={friends}/>
				</div>
			) : ''}
		</>
	)
}

export default MainMenu