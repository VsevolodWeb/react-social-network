import React from 'react'
import {Route} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Dialog from './Dialog/Dialog'
import MessageList from './MessageList/MessageList'
import {getDialogsData} from '../../redux/dialogs-selectors'
import s from './Messages.module.css'
import {actions} from '../../redux/dialogs-reducer'

export const Messages = () => {
    const dialogsData = useSelector(getDialogsData)

    return (
        <>
            <h1 className="title">Messages</h1>
            <div className={s.template}>
                <ul className={s.dialogList}>
                    {dialogsData
                        .map(dialog => <Dialog id={dialog.id} name={dialog.name} key={dialog.id}/>)}
                </ul>
                <div>
                    <div className={s.messageList}>
                        {dialogsData
                            .map(dialog => <Route path={'/messages/' + dialog.id} key={dialog.id}
                                                  render={() => <MessageList
                                                      dialog={dialog}
                                                      addMessage={actions.addMessage} resetMessage={actions.resetMessage}/>}
                                />
                            )}
                    </div>
                </div>
            </div>
        </>
    )
}