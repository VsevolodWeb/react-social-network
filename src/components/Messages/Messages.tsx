import React from 'react';
import { Route } from 'react-router-dom';

import s from './Messages.module.css';
import Dialog from './Dialog/Dialog'
import MessageList from './MessageList/MessageList'
import {MapDispatchToPropsType, MapStateToPropsType} from "./MessagesContainer";

const Messages: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    let dialogElements = props.dialogs.dialogsData.map(dialog => <Dialog id={dialog.id} name={dialog.name} key={dialog.id} />);
    let messageListRoute = props.dialogs.dialogsData
            .map(dialog => <Route path={"/messages/" + dialog.id} key={dialog.id}
                                render={() => <MessageList
                                    dialog={dialog}
                                    addMessage={props.addMessage} resetMessage={props.resetMessage} />}
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
};

export default Messages;