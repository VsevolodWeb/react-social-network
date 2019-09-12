import React from 'react';
import {Route} from 'react-router-dom';
import s from './Messages.module.css';
import Dialog from './Dialog/Dialog'
import MessageList from './MessageList/MessageList'


const Messages = (props) => {
    let dialogElements = props.state.map(dialog => <Dialog id={dialog.id} name={dialog.name} key={dialog.id} />);
    let messageListRoute = props.state
            .map(dialog => <Route path={"/messages/" + dialog.id}
                            key={dialog.id}
                            render={() => <MessageList
                                dialog={dialog}
                                dispatch={props.dispatch}
                                newMessageValue={props.state.newMessageValue} />} />)

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