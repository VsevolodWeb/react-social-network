import React from 'react'
import {useSelector} from 'react-redux'
import {getUserProfile} from '../../../../redux/profile-selectors'
import {ChatMessageType} from '../../../../redux/chat-reducer'
import s from './Message.module.css'

type PropsType = {
	data: ChatMessageType
}

const Message: React.FC<PropsType> = props => {
	const userProfile = useSelector(getUserProfile)

	return (
		<div className={s.item + (props.data.username === userProfile?.fullName ? ` ${s.altPosition}` : '')}>
			<img src={props.data.photo} className={s.img} alt=""/>
			<div>
				<b>{props.data.username}</b>: {props.data.message}
			</div>
		</div>
	)
}

export default Message