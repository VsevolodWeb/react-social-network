import React from 'react';
import {Route} from 'react-router-dom';

import s from './Messages.module.css';
import Dialog from './Dialog/Dialog'
import MessageList from './MessageList/MessageList'

const Messages = (props) => {
    console.log(props)
    let dialogElements = props.dialogs.dialogsData.map(dialog => <Dialog id={dialog.id} name={dialog.name} key={dialog.id} />);
    let messageListRoute = props.dialogs.dialogsData
            .map(dialog => <Route path={"/messages/" + dialog.id} key={dialog.id}
                                render={() => <MessageList
                                    dialog={dialog}
                                    newMessageValue={props.dialogs.newMessageValue}
                                    updateNewMessage={props.updateNewMessage}
                                    addMessage={props.addMessage} />}
                            />
                );

    return (
        <>
            <h1 className="title">Messages</h1>
            <div className={s.template}>
                <ul className={s.dialogList}>
                    {dialogElements}
                </ul>
                <div>
                    <div className={s.messageList}>
                        {messageListRoute}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messages;