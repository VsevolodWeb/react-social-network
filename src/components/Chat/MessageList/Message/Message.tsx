import React from 'react'
import s from './Message.module.css'
import {useSelector} from 'react-redux'
import {getUserProfile} from '../../../../redux/profile-selectors'

type PropsType = {
	name: string
	data: { message: string, userName: string }
}

const Message: React.FC<PropsType> = props => {
	console.log(props)
	const userProfile = useSelector(getUserProfile)

	return (
		<div className={s.item + (props.data.userName === userProfile?.fullName ? ` ${s.altPosition}` : '')}>
			<div className={s.img}/>
			<div>
				<b>{props.data.userName}</b>: {props.data.message}
			</div>
		</div>
	)
}

export default Message