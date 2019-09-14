import React from 'react';

import {addMessageActionCreator, messageChangeActionCreator} from '../../../redux/dialogs-reducer'
import MessageList from './MessageList';


const MessageListContainer = (props) => {
    const addMessage = () => {
        if(!props.newMessageValue) return;
        props.dispatch(addMessageActionCreator(props.dialog.id));
    }

    const updateNewPost = (value) => {
        props.dispatch(messageChangeActionCreator(value));
    }

    return <MessageList updateNewMessage={updateNewPost} addMessage={addMessage} dialog={props.dialog} newMessageValue={props.newMessageValue} />
}

export default MessageListContainer;