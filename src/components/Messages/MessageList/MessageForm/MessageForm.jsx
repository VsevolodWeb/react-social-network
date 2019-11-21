import React from 'react';
import {Field, reduxForm} from 'redux-form';

import { required, maxLength } from '../../../../utils/validators';
import { Textarea } from '../../../common/FormsControls/FormsControls';

const maxLength100 = maxLength(100);

const MessageForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form">
                <Field name="message" placeholder="Сообщение" component={Textarea} validate={[required, maxLength100]} />
                <div className="formGroup">
                    <button className="button">Отправить</button>
                </div>
            </div>
        </form>
    )
};

export default reduxForm({
    form: 'addMessage'
})(MessageForm);