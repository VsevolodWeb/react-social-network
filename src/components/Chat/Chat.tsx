import React, {useEffect} from 'react'
import s from './Chat.module.css'
import {Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import MessageList from './MessageList/MessageList'
import Dialog from './Dialog/Dialog'
import {startMessageListening, stopMessageListening} from '../../redux/chat-reducer'

export type WsChannelStatusType =
	typeof WebSocket.CONNECTING
	| typeof WebSocket.OPEN
	| typeof WebSocket.CLOSING
	| typeof WebSocket.CLOSED

export const Chat = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(startMessageListening())

		return () => {
			dispatch(stopMessageListening())
		}
	}, [])

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
					       render={MessageList}
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