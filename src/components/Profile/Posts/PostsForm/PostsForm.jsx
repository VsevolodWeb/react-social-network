import React from 'react';
import {reduxForm, Field} from 'redux-form';
import { required, maxLength } from '../../../../utils/validators';
import { Textarea } from '../../../common/FormsControls/FormsControls';

const maxLength30 = maxLength(30);

const PostsForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field className="textarea" name="postMessage" placeholder="Сообщение" component={Textarea} validate={[required, maxLength30]} />
            <button className="button">Отправить</button>
        </form>
    )
}

export default reduxForm({
    form: 'addPost'
})(PostsForm);;