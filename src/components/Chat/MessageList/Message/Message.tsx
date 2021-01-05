import React from 'react';
import s from './Message.module.css'

type PropsType = {
    name: string
    data: {message: string, userName: string}
}

const Message: React.FC<PropsType> = props => {
    return (
        <div className={s.item + (props.name !== props.data.userName ? ` ${s.altPosition}`: '')}>
            <div className={s.img} />
            <div>
                <b>{props.data.userName}</b>: {props.data.message}
            </div>
        </div>
    )
};

export default Message;