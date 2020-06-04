import React from 'react';
import {reduxForm, InjectedFormProps} from 'redux-form';
import { required, maxLength } from '../../../../utils/validators';
import {CustomField, FieldNames, Textarea} from '../../../common/FormsControls/FormsControls';
import {FormDataType} from "../Posts";

const maxLength30 = maxLength(30);

type OwnPropsType = {}
type PropsType = InjectedFormProps<FormDataType, OwnPropsType> & OwnPropsType;
type FieldNameType = FieldNames<FormDataType>

const PostsForm: React.FC<PropsType> = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form">
                <CustomField<FieldNameType> name="postMessage" placeholder="Сообщение" component={Textarea} validate={[required, maxLength30]} />
                <div className="formGroup">
                    <button className="button">Отправить</button>
                </div>
            </div>
        </form>
    )
};

export default reduxForm<FormDataType, OwnPropsType>({
    form: 'addPost'
})(PostsForm);