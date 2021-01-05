import React, {useEffect, useState} from 'react'
import s from './Chat.module.css'
import {Route} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getDialogsData} from '../../redux/dialogs-selectors'
import MessageList from './MessageList/MessageList'
import Dialog from './Dialog/Dialog'

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export const Chat = () => {
    const [messages, setMessages] = useState([])
    const dialogsData = useSelector(getDialogsData)

    useEffect(() => {
        ws.addEventListener('message', (e) => {
            setMessages(JSON.parse(e.data))
        })
    }, [])

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
                               }}/>}
                    />
                    {dialogsData
                        .map(dialog => <Route path={'/messages/' + dialog.id} key={dialog.id}
                                              render={() => <MessageList
                                                  dialog={dialog}/>}
                            />
                        )}
                </div>
            </div>
        </div>
    )
}