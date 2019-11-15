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

        if(this.props.status !== this.state.status) {
            this.props.updateUserStatus(this.state.status);
        }
    }

    statusChange = e => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div className={s.container}>
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