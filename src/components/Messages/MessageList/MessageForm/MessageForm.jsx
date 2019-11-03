import React from 'react';
import {Field, reduxForm} from 'redux-form';

const MessageForm = props => {
    const addMessage = (e) => {
        e.preventDefault();
        props.handleSubmit();
        props.reset();
    }
    return (
        <form onSubmit={addMessage}>
            <Field className="textarea" value={props.newMessageValue} component="textarea" name="message" />
            <button className="button">Отправить</button>
        </form>
    )
}

export default reduxForm({
    form: 'addMessage'
})(MessageForm);