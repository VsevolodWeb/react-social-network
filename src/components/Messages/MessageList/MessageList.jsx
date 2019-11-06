import React from 'react';
import Message from './Message/Message';
import MessageForm from './MessageForm/MessageForm';


const MessageList = (props) => {
    let messageList = props.dialog.messages.map(item => {
        return <Message name={props.dialog.name} data={item} key={item.id} />
    });

    const addMessage = data => {
        props.addMessage(props.dialog.id, data.message);
    }

    messageList.push(
        <div key="0">
            <MessageForm onSubmit={addMessage} />
        </div>
    )

    return messageList
}

export default MessageList;