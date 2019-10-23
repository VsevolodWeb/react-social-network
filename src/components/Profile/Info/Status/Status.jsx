import React from 'react';
import s from './Status.module.css'

const Status = (props) => {
    return (
        <div className={s.container}>
            <div className={s.status}>Status</div>
            <input type="text" />
        </div>
    )
}

export default Status;