import React from 'react';
import {reduxForm, Field, InjectedFormProps} from 'redux-form';

import {CustomField, FieldNames, Input} from '../../../common/FormsControls/FormsControls';
import {ProfileContactsType, ProfileType} from "../../../../redux/types/types";

type OwnPropsType = {
    aboutMe: string
    contacts: ProfileContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
}
type PropsType = InjectedFormProps<ProfileType, OwnPropsType> & OwnPropsType;
type FieldNameType = FieldNames<ProfileType>

const DataForm: React.FC<PropsType> = props => {
    let contactsFields = [];
    if(props.contacts) {
        // todo field name typescript
        contactsFields.push(Object.keys(props.contacts)
                      .map((value, index) => <CustomField key={index} component={Input}
                        name={"contacts." + value}
                        placeholder={value.charAt(0).toUpperCase() + value.substring(1)}
                        value={value} />));
    }

    return  <>
                {props.error ? props.error.map((item, index) => <div key={index} className="formGroup__errorText">{item}</div>) : null}
                <form onSu bmit={props.handleSubmit}>
                    <div className="form">
                        <div className="formTitle">General info:</div>
                        <CustomField<FieldNameType> component={Input} name="fullName" type="text" placeholder="Full name" />
                        <CustomField<FieldNameType> component={Input} name="aboutMe" type="text" placeholder="About Me" />
                        <CustomField<FieldNameType> component={Input} name="lookingForAJob" type="checkbox" labelText="Looking for job" />
                        <CustomField<FieldNameType> component={Input} name="lookingForAJobDescription" placeholder="My skills" />
                        <div className="formTitle">Contacts:</div>
                        {contactsFields}
                        <div className="formGroup">
                            <button className="button">Save</button>
                        </div>
                    </div>
                </form>
            </>
};

export default reduxForm<ProfileType, OwnPropsType>({
    form: 'edit-profile'
})(DataForm);