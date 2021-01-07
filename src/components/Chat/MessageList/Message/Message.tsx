import React from 'react'
import {useSelector} from 'react-redux'
import {getUserProfile} from '../../../../redux/profile-selectors'
import {MessageType} from '../../../../redux/types/types'
import s from './Message.module.css'

type PropsType = {
	name: string
	data: MessageType
}

const Message: React.FC<PropsType> = props => {
	const userProfile = useSelector(getUserProfile)

	return (
		<div className={s.item + (props.data.userName === userProfile?.fullName ? ` ${s.altPosition}` : '')}>
			<img src={props.data.photo} className={s.img} alt=""/>
			<div>
				<b>{props.data.userName}</b>: {props.data.message}
			</div>
		</div>
	)
}

export default Message