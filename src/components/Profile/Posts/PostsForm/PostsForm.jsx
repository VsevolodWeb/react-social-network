import React from 'react';
import {reduxForm, Field} from 'redux-form';
import { required, maxLength } from '../../../../utils/validators';
import { Textarea } from '../../../common/FormsControls/FormsControls';

const maxLength30 = maxLength(30);

const PostsForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form">
                <Field name="postMessage" placeholder="Сообщение" component={Textarea} validate={[required, maxLength30]} />
                <div className="formGroup">
                    <button className="button">Отправить</button>
                </div>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'addPost'
})(PostsForm);;