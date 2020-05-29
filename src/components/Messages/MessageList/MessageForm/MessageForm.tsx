import React, {FC} from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';

import { required, maxLength } from '../../../../utils/validators';
import {CustomField, Textarea} from '../../../common/FormsControls/FormsControls';
import {MessageFormType} from "../MessageList";

export type OwnPropsType = {}

type PropsType = InjectedFormProps<MessageFormType, OwnPropsType> & OwnPropsType

const maxLength100 = maxLength(100);

export const MessageForm: FC<PropsType> = props => (
    <form onSubmit={props.handleSubmit}>
        <div className="form">
            <Field name="message" placeholder="Сообщение" component={Textarea} validate={[required, maxLength100]} />
            <div className="formGroup">
                <button className="button">Отправить</button>
            </div>
        </div>
    </form>
);

export default reduxForm<MessageFormType, OwnPropsType>({
    form: 'addMessage'
})(MessageForm);