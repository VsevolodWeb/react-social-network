import React from 'react';
import s from './FormsControls.module.css';

export const Textarea = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    let formGroupClassname = s.formGroup;

    if(hasError) {
        formGroupClassname = formGroupClassname + " " + s.formGroup_error;
    }

    return (
        <div className={formGroupClassname}>
            <textarea className={s.textElement} rows="4" {...input} {...props}></textarea>
            {hasError && <span className={s.formGroup__errorText}>{meta.error}</span>}
        </div>
    )
} 