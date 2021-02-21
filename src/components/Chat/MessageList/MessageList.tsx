import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Message from './Message/Message'
import MessageForm from './MessageForm/MessageForm'
import {actions, sendMessage} from '../../../redux/chat-reducer'
import s from './MessageList.module.css'
import {getChatMessages} from '../../../redux/chat-selectors'

export type MessageFormType = {
	message: string
}

const MessageList = React.memo(() => {
	const listRef = useRef<HTMLDivElement>(null)
	const dispatch = useDispatch()
	const messages = useSelector(getChatMessages)
	const [isMessagesLoaded, setIsMessagesLoaded] = useState(false)

	const addMessage = (data: MessageFormType) => {
		dispatch(sendMessage(data.message))
		dispatch(actions.resetMessage())
	}

	useEffect(() => {
		if (listRef.current && isMessagesLoaded) {
			listRef.current.scrollTop = listRef.current.scrollHeight
		}
	}, [isMessagesLoaded])

	useEffect(() => {
		if (listRef.current) {
			if (listRef.current.offsetHeight + listRef.current.scrollTop >= (listRef.current.scrollHeight - 100)) {
				listRef.current.scrollTop = listRef.current.scrollHeight
			}
		}
	}, [messages])

	useEffect(() => {
		if (messages.length) {
			setIsMessagesLoaded(true)
		}
	}, [messages.length])

	return <>
		<div className={s.list} ref={listRef}>
			{messages.map((item, index) => <Message data={item} key={item.id}/>)}
		</div>
		<MessageForm onSubmit={addMessage}/>
	</>
})

export default MessageList