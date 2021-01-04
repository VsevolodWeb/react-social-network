import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {profileAPI} from '../../../../api/profile-api'
import {actions} from '../../../../redux/profile-reducer'
import s from './Status.module.css'

type PropsType = {
    status: string
    editingAbility: boolean
}

const StatusWithHooks: React.FC<PropsType> = props => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)
    const dispatch = useDispatch()

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const toggleEditMode = async () => {
        setEditMode(!editMode)

        if (props.status !== status) {
            const response = await profileAPI.updateUserStatus(status)

            if (response.resultCode === 0) {
                dispatch(actions.setUserStatus(status))
            }
        }
    }

    const statusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {props.editingAbility ?
                editMode ?
                    <input type="text" onBlur={toggleEditMode} onChange={statusChange} value={status} autoFocus/>
                    : <span className={`${s.status} ${s.status_editingAbility}`}
                            onDoubleClick={toggleEditMode}>{props.status}</span>
                : <span className={s.status}>{props.status}</span>
            }
        </div>
    )
}


export default StatusWithHooks