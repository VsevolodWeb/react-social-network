import React, { useState, useEffect } from 'react';
import s from './Status.module.css'

const StatusWithHooks = props => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const toggleEditMode = () => {
        setEditMode(!editMode);

        if(props.status !== status) {
            props.updateUserStatus(status);
        }
    };

    const statusChange = e => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div>
            {props.editingAbility ?
                editMode ?
                    <input type="text" onBlur={toggleEditMode} onChange={statusChange} value={status} autoFocus />
                    : <span className={`${s.status} ${s.status_editingAbility}`} onDoubleClick={toggleEditMode}>{props.status}</span>
                : <span className={s.status}>{props.status}</span>
            }
        </div>
    )
}

export default StatusWithHooks;