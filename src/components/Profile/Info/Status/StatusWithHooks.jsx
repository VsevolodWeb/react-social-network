import React, { useState } from 'react';
import s from './Status.module.css'

const StatusWithHooks = props => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    const toggleEditMode = () => {
        setEditMode(!editMode);

        if(props.status !== status) {
            props.updateUserStatus(status);
        }
    }

    const statusChange = e => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div className={s.container}>
            {props.editingAbility ?
                editMode ?
                    <input type="text" onBlur={toggleEditMode} onChange={statusChange} value={status} autoFocus />
                    : <span className={`${s.status} ${s.status_editingAbility}`} onDoubleClick={toggleEditMode}>{status}</span>
                : <span className={s.status}>{status}</span>
            }
        </div>
    )
}

export default StatusWithHooks;