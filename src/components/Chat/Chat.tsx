import React, {useEffect, useMemo, useState} from 'react'
import s from './Chat.module.css'
import {Route} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getDialogsData} from '../../redux/dialogs-selectors'
import MessageList from './MessageList/MessageList'
import Dialog from './Dialog/Dialog'
import {MessageType} from '../../redux/types/types'

export const Chat = () => {
    const [messages, setMessages] = useState<MessageType[]>([])
    const wsChannel = useMemo(() => {
        return new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    }, [])
    const dialogsData = useSelector(getDialogsData)

    useEffect(() => {
        wsChannel.addEventListener('message', e => {
            setMessages(prevState => [...prevState, ...JSON.parse(e.data)])
        })
    }, [wsChannel])

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
                               wsChannel={wsChannel}
                               dialog={{
                                   id: 0,
                                   name: 'Chat',
                                   messages
                               }}/>}
                    />
                    {dialogsData
                        .map(dialog => <Route path={'/messages/' + dialog.id} key={dialog.id}
                                              render={() => <MessageList
                                                  dialog={dialog}
                                                  wsChannel={wsChannel}/>}
                            />
                        )}
                </div>
            </div>
        </div>
    )
}