import React from 'react';
import s from './FormsControls.module.css';

const FormControl = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    const children = props.children;
    console.log([...children.props])

    return (
        <div className={"formGroup" + (hasError ? " formGroup_error" : "")}>
            {React.createElement(children.type)}
            {hasError && <span className="formGroup__errorText">{meta.error}</span>}
        </div>
    )
}

export const Textarea = props => {
    return (
        <FormControl {...props}>
            <textarea className={s.textElement} rows="4"/>
        </FormControl>
    )
}

export const Input = props => {
    return (
        <FormControl {...props}>
            <input className={s.textElement}/>
        </FormControl>
    )
}