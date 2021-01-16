import React, {useEffect, useRef} from 'react'
import {useDispatch} from 'react-redux'
import Message from './Message/Message'
import MessageForm from './MessageForm/MessageForm'
import {DialogType} from '../../../redux/types/types'
import {actions} from '../../../redux/dialogs-reducer'
import s from './MessageList.module.css'
import {WsChannelStatusType} from '../Chat'

export type MessageFormType = {
	message: string
}

type PropsType = {
	dialog: DialogType
	wsChannel: WebSocket
	wsChannelStatus: WsChannelStatusType | null
}

const MessageList: React.FC<PropsType> = React.memo(props => {
	const listRef = useRef<HTMLDivElement>(null)
	const dispatch = useDispatch()

	let messages = props.dialog.messages.map((item, index) => {
		return <Message name={props.dialog.name} data={item} key={index}/>
	})

	const addMessage = (data: MessageFormType) => {
		if (props.dialog.id === 0) { // if chat id
			props.wsChannel.send(data.message)
		} else {
			dispatch(actions.addMessage(props.dialog.id, data.message))
		}
		dispatch(actions.resetMessage())
	}

	useEffect(() => {
		if (listRef.current) {
			listRef.current.scrollTop = listRef.current.scrollHeight
		}
	})

	return <>
		<div className={s.list} ref={listRef}>
			{messages}
		</div>
		<MessageForm onSubmit={addMessage} wsChannelStatus={props.wsChannelStatus}/>
	</>
})

export default MessageList