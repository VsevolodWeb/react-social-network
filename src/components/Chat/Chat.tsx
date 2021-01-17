import React, {useCallback, useEffect, useRef, useState} from 'react'
import s from './Chat.module.css'
import {Route} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getDialogsData} from '../../redux/dialogs-selectors'
import MessageList from './MessageList/MessageList'
import Dialog from './Dialog/Dialog'
import {MessageType} from '../../redux/types/types'

export type WsChannelStatusType =
	typeof WebSocket.CONNECTING
	| typeof WebSocket.OPEN
	| typeof WebSocket.CLOSING
	| typeof WebSocket.CLOSED

export const Chat = () => {
	const [messages, setMessages] = useState<MessageType[]>([])
	const dialogsData = useSelector(getDialogsData)
	const wsChannel = useRef<WebSocket | null>(null)
	const [wsChannelStatus, setWsChannelStatus] = useState<WsChannelStatusType | null>(null)
	const createChannel = useCallback(() => {
		wsChannel.current?.close()
		wsChannel.current = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
	}, [])
	const connect = useCallback(() => {
		createChannel()

		wsChannel.current?.addEventListener('message', e => {
			setMessages(prevState => [...prevState, ...JSON.parse(e.data)])
		})

		wsChannel.current?.addEventListener('open', () => {
			console.log('Socket is open.')
		})

		wsChannel.current?.addEventListener('close', e => {
			console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason)

			setTimeout(connect, 1000)
		})

		wsChannel.current?.addEventListener('error', e => {
			console.error('Socket encountered error: ', e, 'Closing socket')

			wsChannel.current?.close()
		})


	}, [createChannel, wsChannel])

	useEffect(() => {
		connect()
	}, [connect])

	useEffect(() => {
		wsChannel.current && setWsChannelStatus(wsChannel.current.readyState)
	}, [wsChannel.current.readyState])

	return (
		<div className={s.template}>
			<ul className={s.dialogList}>
				<Dialog id={0} name="Chat" key={0}/>
				{dialogsData
					.map(dialog => <Dialog id={dialog.id} name={dialog.name} key={dialog.id}/>)}
			</ul>
			<div>
				<div className={s.messageList}>
					<Route path={'/messages/0'} key={0}
					       render={() => <MessageList
						       dialog={{
							       id: 0,
							       name: 'Chat',
							       messages
						       }}
						       wsChannel={wsChannel.current}
						       wsChannelStatus={wsChannelStatus}
					       />}
					/>
					{dialogsData
						.map(dialog => <Route path={'/messages/' + dialog.id} key={dialog.id}
						                      render={() => <MessageList
							                      dialog={dialog}
							                      wsChannel={wsChannel.current}
							                      wsChannelStatus={wsChannelStatus}/>}
							/>
						)}
				</div>
			</div>
		</div>
	)
}