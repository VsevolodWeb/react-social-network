import React from 'react';
import s from './MessageList.module.css';

import {addMessageActionCreator, messageChangeActionCreator} from '../../../redux/dialogs-reducer'


const MessageList = (props) => {
    let messageList = props.dialog.messages.map(item => {
        return (
            <div className={s.item + (props.dialog.name !== item.from ? ` ${s.altPosition}`: '')} key={item.id}>
                <div className={s.img}></div>
                <div className={s.name}>
                    <b>{item.from}</b>: {item.text}
                </div>
            </div>
        )
    });

    const addMessage = () => {
        if(!props.newMessageValue) return;
        props.dispatch(addMessageActionCreator(props.dialog.id));
    }

    const messageChange = (e) => {
        props.dispatch(messageChangeActionCreator(e.currentTarget.value));
    }

    messageList.push(
        <div key={messageList.length + 1}>
            <textarea className="textarea" onChange={messageChange} value={props.newMessageValue}></textarea>
            <button className="button" onClick={addMessage}>Отправить</button>
        </div>
    )

    return messageList
}

export default MessageList;