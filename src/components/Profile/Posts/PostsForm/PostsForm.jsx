import React from 'react';
import {reduxForm, Field} from 'redux-form';

const PostsForm = props => {
    const addPost = (e) => {
        e.preventDefault();
        props.handleSubmit();
        props.reset();
    }
    return (
        <form onSubmit={addPost}>
            <Field className="textarea" name="postMessage" component="textarea" />
            <button className="button">Отправить</button>
        </form>
    )
}

export default reduxForm({
    form: 'addPost'
})(PostsForm);;