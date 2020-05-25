import React from 'react';
import Message from './Message/Message';
import MessageForm from './MessageForm/MessageForm';
import {DialogType} from "../../../redux/types/types";
import {actions} from "../../../redux/dialogs-reducer";

type PropsType = {
    dialog: DialogType
    addMessage: typeof actions.addMessage
    resetMessage: typeof actions.resetMessage
}

const MessageList: React.FC<PropsType> = props => {
    let messageList = props.dialog.messages.map(item => {
        return <Message name={props.dialog.name} data={item} key={item.id} />
    });

    const addMessage = data => {
        props.addMessage(props.dialog.id, data.message);
        props.resetMessage();
    };

    messageList.push(
        <div key="0">
            <MessageForm onSubmit={addMessage} />
        </div>
    );

    return messageList
};

export default MessageList;