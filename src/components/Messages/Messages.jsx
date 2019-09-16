import React from 'react';
import {Route} from 'react-router-dom';

import s from './Messages.module.css';
import Dialog from './Dialog/Dialog'
import MessageListContainer from './MessageList/MessageListContainer'
import DispatchContext from '../../DispatchContext'

const Messages = (props) => {
    let dialogElements = props.state.dialogsData.map(dialog => <Dialog id={dialog.id} name={dialog.name} key={dialog.id} />);
    let messageListRoute = props.state.dialogsData
            .map(dialog => <DispatchContext.Consumer key={dialog.id}>
                            {value => <Route path={"/messages/" + dialog.id}
                                        render={() => <MessageListContainer
                                                        dialog={dialog}
                                                        dispatch={value}
                                                        newMessageValue={props.state.newMessageValue} />}
                                      />}
                            </DispatchContext.Consumer>
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