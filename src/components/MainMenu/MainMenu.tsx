import React from 'react'
import {Menu} from 'antd'
import {connect} from 'react-redux'
import Friends from './Friends/Friends'
import {AppStateType} from '../../redux/redux-store'
import {UserType} from '../../redux/types/types'
import {Link} from 'react-router-dom'

type MapStateToProps = {}
type MapDispatchToProps = {}
type OwnPropsType = {
	users: UserType[]
}
type PropsType = MapStateToProps & MapDispatchToProps & OwnPropsType

const MainMenu: React.FC<PropsType> = (props) => {
	let friends = props.users.filter((item) => item.followed)

	return (
		<>
			<Menu
				mode="inline"
				style={{height: '100%'}}
			>
				<Menu.Item>
					<Link to="/profile">My profile</Link>
				</Menu.Item>
				<Menu.Item>
					<Link to="/messages">Messages</Link>
				</Menu.Item>
				<Menu.Item>
					<Link to="/users">Users</Link>
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