import React from 'react';
import s from './FormsControls.module.css';

export const Textarea = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;

    return (
        <div className={"formGroup_error" + hasError ? " formGroup_error" : ""}>
            <textarea className={s.textElement} rows="4" {...input} {...props}></textarea>
            {hasError && <span className="formGroup__errorText">{meta.error}</span>}
        </div>
    )
}

export const Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;

    return (
        <div className={"formGroup_error" + hasError ? " formGroup_error" : ""}>
            <input className={s.textElement} rows="4" {...input} {...props} />
            {hasError && <span className="formGroup__errorText">{meta.error}</span>}
        </div>
    )
}