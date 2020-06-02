import React from 'react';
import {reduxForm, Field} from 'redux-form';

import { Input } from '../../../common/FormsControls/FormsControls';

const DataForm = props => {
    let contactsFields = [];
    if(props.contacts) {
        contactsFields.push(Object.keys(props.contacts)
                        .map((value, index) => <Field key={index} component={Input}
                            name={"contacts." + value} placeholder={value.charAt(0).toUpperCase() + value.substring(1)} value={props.contacts[index]} />));
    }

    return  <>
                {props.error ? props.error.map((item, index) => <div key={index} className="formGroup__errorText">{item}</div>) : null}
                <form onSubmit={props.handleSubmit}>
                    <div className="form">
                        <div className="formTitle">General info:</div>
                        <Field component={Input} name="fullName" type="text" placeholder="Full name" />
                        <Field component={Input} name="lookingForAJob" type="checkbox" labelText="Looking for job" />
                        <Field component={Input} name="lookingForAJobDescription" placeholder="My skills" />
                        <Field component={Input} name="aboutMe" placeholder="About me" />
                        <div className="formTitle">Contacts:</div>
                        {contactsFields}
                        <div className="formGroup">
                            <button className="button">Save</button>
                        </div>
                    </div>
                </form>
            </>
};

export default reduxForm({
    form: 'edit-profile'
})(DataForm);