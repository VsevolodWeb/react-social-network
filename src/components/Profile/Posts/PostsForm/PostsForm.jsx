import React from 'react';
import {reduxForm, Field} from 'redux-form';
import { required, maxLength } from '../../../../utils/validators';
import { Textarea } from '../../../common/FormsControls/FormsControls';
import s from '../../../common/FormsControls/FormsControls.module.css';

const maxLength30 = maxLength(30);

const PostsForm = props => {
    return (
        <div className={s.form}>
            <form onSubmit={props.handleSubmit}>
                <Field name="postMessage" placeholder="Сообщение" component={Textarea} validate={[required, maxLength30]} />
                <div className={s.formGroup}>
                    <button className={s.button}>Отправить</button>
                </div>
            </form>
        </div>
    )
}

export default reduxForm({
    form: 'addPost'
})(PostsForm);;