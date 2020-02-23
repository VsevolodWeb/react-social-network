import React, {ChangeEvent} from 'react';
import s from './Status.module.css'

type PropsType = {
    status: string
    editingAbility: boolean
    updateUserStatus: (status: string) => void
}

type StateType = {
    editMode: boolean
    status: string
}

class Status extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    };

    toggleEditMode = () => {
        this.setState({
            editMode: !this.state.editMode
        });

        if(this.props.status !== this.state.status) {
            this.props.updateUserStatus(this.state.status);
        }
    };

    statusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    };

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {this.props.editingAbility ?
                    this.state.editMode ?
                        <input type="text" onBlur={this.toggleEditMode} onChange={this.statusChange} value={this.state.status} autoFocus />
                        : <span className={`${s.status} ${s.status_editingAbility}`} onDoubleClick={this.toggleEditMode}>{this.state.status}</span>
                    : <span className={s.status}>{this.state.status}</span>
                }
            </div>
        )
    }
}

export default Status;