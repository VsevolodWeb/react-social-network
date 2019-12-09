import React, { useState } from 'react';
import {reduxForm, Field} from 'redux-form';

import { Input, Textarea } from '../../../common/FormsControls/FormsControls';

const DataForm = props => {
    let contactsFields = [];

    if(props.contacts) {
        contactsFields.push(Object.keys(props.contacts)
                        .map((value, index) => <Field key={index} component={Input}
                            name={value} placeholder={value.charAt(0).toUpperCase() + value.substring(1)} value={props.contacts[index]} />));
    }

    return <form onSubmit={props.handleSubmit}>
                <div className="form">
                    <div className="formTitle">General info:</div>
                    <Field component={Input} name="looking_for_job" placeholder="Looking for job" />
                    <Field component={Input} name="my_skills" placeholder="My skills" value={props.lookingForJobDescription} />
                    <Field component={Input} name="about_me" placeholder="About me" value={props.aboutMe} />
                    <div className="formTitle">Contacts:</div>
                    {contactsFields}
                    <div className="formGroup">
                        <button className="button">Save</button>
                    </div>
                </div>
            </form>
}

export default reduxForm({
    form: 'profile',
    initialValues: {
        looking_for_job: this
    },
    enableReinitialize: true
})(DataForm);