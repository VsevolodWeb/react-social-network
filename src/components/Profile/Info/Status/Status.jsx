import React from 'react';
import s from './Status.module.css'

class Status extends React.Component {
    state = {
        editMode: false
    }

    toggleEditMode = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    render() {
        return (
            <div className={s.container}>
                {this.state.editMode ?
                    <input type="text" onBlur={this.toggleEditMode} value={this.props.text} autoFocus /> :
                    <div className={s.status} onDoubleClick={this.toggleEditMode}>{this.props.text}</div>}
            </div>
        )
    }
}

export default Status;