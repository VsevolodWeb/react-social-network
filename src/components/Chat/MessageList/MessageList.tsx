import React from 'react'
import Message from './Message/Message'
import MessageForm from './MessageForm/MessageForm'
import {DialogType} from '../../../redux/types/types'
import {actions} from '../../../redux/dialogs-reducer'
import {useDispatch} from 'react-redux'

export type MessageFormType = {
    message: string
}

type PropsType = {
    dialog: DialogType
}

const MessageList: React.FC<PropsType> = props => {
    const dispatch = useDispatch()
    let messages = props.dialog.messages.map((item, index) => {
        return <Message name={props.dialog.name} data={item} key={index}/>
    })

    const addMessage = (data: MessageFormType) => {
        dispatch(actions.addMessage(props.dialog.id, data.message))
        dispatch(actions.resetMessage())
    }

    messages.push(
        <div key="0">
            <MessageForm onSubmit={addMessage}/>
        </div>
    )

    return <>{messages}</>
}

export default MessageList