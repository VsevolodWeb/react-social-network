import React, {InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes} from 'react';
import s from './FormsControls.module.css';
import {
    BaseFieldProps,
    Field,
    WrappedFieldMetaProps,
    WrappedFieldProps
} from "redux-form";


type FormsControlType = {
    meta: WrappedFieldMetaProps
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> &
    SelectHTMLAttributes<HTMLSelectElement> &
    TextareaHTMLAttributes<HTMLTextAreaElement> & BaseFieldProps<InputType>
export const CustomField = <T extends String>(props: FieldProps & {name: T, labelText?: string}) => {
    return <Field {...props}/>
}

const FormControl: React.FC<FormsControlType> = (props) => {
    const hasError = props.meta.touched && props.meta.error;

    return (
        <div className={"formGroup" + (hasError ? " formGroup_error" : "")}>
            {props.children}
            {hasError && <span className="formGroup__errorText">{props.meta.error}</span>}
        </div>
    )
};

export const Textarea: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    return (
        <FormControl meta={meta}>
            <textarea className={s.textElement} rows={4} {...input} {...props}/>
        </FormControl>
    )
};

type InputType = WrappedFieldProps & {
    labelText: string
}
export const Input: React.FC<InputType> = ({input, meta, labelText, ...props}) => {
    return (
        <FormControl meta={meta}>
            <label className="label label_inline">
                {labelText}
                <input className={s.textElement} {...input} {...props}/>
            </label>
        </FormControl>
    )
};

export type FieldNames<T> = Extract<keyof T, string>