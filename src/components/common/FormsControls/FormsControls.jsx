import React from 'react';
import s from './FormsControls.module.css';

const FormControl = props => {
    const hasError = props.meta.touched && props.meta.error;

    return (
        <div className={"formGroup" + (hasError ? " formGroup_error" : "")}>
            {props.children}
            {hasError && <span className="formGroup__errorText">{props.meta.error}</span>}
        </div>
    )
};

export const Textarea = ({input, meta, ...props}) => {
    return (
        <FormControl meta={meta}>
            <textarea className={s.textElement} rows="4" {...input} {...props}/>
        </FormControl>
    )
};

export const Input = ({input, meta, labelText, ...props}) => {
    return (
        <FormControl meta={meta}>
            <label className="label label_inline">
                {labelText}
                <input className={s.textElement} autoComplete="current-password" {...input} {...props}/>
            </label>
        </FormControl>
    )
};