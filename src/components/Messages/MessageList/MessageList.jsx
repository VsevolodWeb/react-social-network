import React from 'react';
import Message from './Message/Message';


const MessageList = (props) => {
    let messageList = props.dialog.messages.map(item => {
        return <Message name={props.dialog.name} data={item} key={item.id} />
    });

    const addMessage = () => {
        if(!props.newMessageValue) return;
        props.addMessage(props.dialog.id);
    }
    
    const updateNewMessage = (e) => {
        props.updateNewMessage(e.currentTarget.value);
    }

    messageList.push(
        <div key="0">
            <textarea className="textarea" onChange={updateNewMessage} value={props.newMessageValue}></textarea>
            <button className="button" onClick={addMessage}>Отправить</button>
        </div>
    )

    return messageList
}

export default MessageList;