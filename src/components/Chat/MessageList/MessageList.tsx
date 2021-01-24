import React, {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Message from './Message/Message'
import MessageForm from './MessageForm/MessageForm'
import {actions, sendMessage} from '../../../redux/chat-reducer'
import s from './MessageList.module.css'
import {getChatMessages} from '../../../redux/chat-selectors'

export type MessageFormType = {
	message: string
}

const MessageList = React.memo(props => {
	const listRef = useRef<HTMLDivElement>(null)
	const dispatch = useDispatch()
	const messages = useSelector(getChatMessages)

	let messagesElements = messages.map((item, index) => {
		return <Message data={item} key={index}/>
	})

	const addMessage = (data: MessageFormType) => {
		dispatch(sendMessage(data.message))
		dispatch(actions.resetMessage())
	}

	useEffect(() => {
		if (listRef.current) {
			listRef.current.scrollTop = listRef.current.scrollHeight
		}
	})

	return <>
		<div className={s.list} ref={listRef}>
			{messagesElements}
		</div>
		<MessageForm onSubmit={addMessage}/>
	</>
})

export default MessageList