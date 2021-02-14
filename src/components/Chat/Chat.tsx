import React, {useEffect} from 'react'
import {Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {notification} from 'antd'
import MessageList from './MessageList/MessageList'
import Dialog from './Dialog/Dialog'
import {startMessageListening, stopMessageListening} from '../../redux/chat-reducer'
import {getChatStatusCode} from '../../redux/chat-selectors'
import s from './Chat.module.css'

export const Chat = () => {
	const statusCode = useSelector(getChatStatusCode)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(startMessageListening())

		return () => {
			dispatch(stopMessageListening())
		}
	}, [dispatch])

	useEffect(() => {
		if(statusCode) {
			let notificationText

			switch (statusCode) {
				case WebSocket.OPEN: {
					notificationText = 'Чат онлайн'

					break;
				}
				case WebSocket.CLOSING: {
					notificationText = 'Соединение прервано... Переподключение...'

					break
				}
			}


			if(notificationText) {
				notification.open({
					message: 'WebSocket Status',
					description: `Status code: ${notificationText}`
				})
			}
		}
	}, [statusCode])

	return (
		<div className={s.template}>
			<ul className={s.dialogList}>
				<Dialog id={0} name="Chat" key={0}/>
				{/*{dialogsData*/}
				{/*	.map(dialog => <Dialog id={dialog.id} name={dialog.name} key={dialog.id}/>)}*/}
			</ul>
			<div>
				<div className={s.messageList}>
					<Route path={'/messages/0'} key={0}
					       render={() => <MessageList />}
					/>
					{/*{dialogsData*/}
					{/*	.map(dialog => <Route path={'/messages/' + dialog.id} key={dialog.id}*/}
					{/*	                      render={() => <MessageList*/}
					{/*		                      dialog={dialog}*/}
					{/*		                      wsChannel={wsChannel.current}*/}
					{/*		                      wsChannelStatus={wsChannelStatus}/>}*/}
					{/*		/>*/}
					{/*	)}*/}
				</div>
			</div>
		</div>
	)
}