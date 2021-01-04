import React from 'react';
import s from './Message.module.css'

type PropsType = {
    name: string
    data: {id: number, text: string, from: string}
}

const Message: React.FC<PropsType> = (props) => {
    return (
        <div className={s.item + (props.name !== props.data.from ? ` ${s.altPosition}`: '')}>
            <div className={s.img} />
            <div>
                <b>{props.data.from}</b>: {props.data.text}
            </div>
        </div>
    )
};

export default Message;