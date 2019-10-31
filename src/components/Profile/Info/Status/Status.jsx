import React from 'react';
import s from './Status.module.css'

class Status extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    toggleEditMode = () => {
        this.setState({
            editMode: !this.state.editMode
        })
        this.props.updateUserStatus(this.state.status);
    }

    statusChange = e => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    render() {
        return (
            <div className={s.container}>
                {this.props.editingAbility ?
                    this.state.editMode ?
                        <input type="text" onBlur={this.toggleEditMode} onChange={this.statusChange} value={this.state.status} autoFocus />
                        : <div className={`${s.status} ${s.status_editingAbility}`} onDoubleClick={this.toggleEditMode}>{this.props.status}</div>
                    : <div className={s.status}>{this.props.status}</div>
                }
            </div>
        )
    }
}

export default Status;