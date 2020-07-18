import React from 'react'
import s from './UsersSearchForm.module.css'
import {Field, Form, Formik, FormikHelpers} from 'formik'
import validate from './UsersSearchForm.validate'
import cn from 'classnames'

type ValuesType = {
    term: string
}

const UsersSearchForm = () => {
    const onSubmit = (values: ValuesType, {setSubmitting}: FormikHelpers<ValuesType>) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
        }, 400)
    }

    return (
        <Formik<ValuesType>
            initialValues={{term: ''}}
            validate={validate}
            onSubmit={onSubmit}
        >
            {({isSubmitting}) => (
                <Form>
                    <div className={cn('form', s.form)}>
                        <Field type="text" name="term" placeholder="Search fo users" className="textElement"/>
                        <button type="submit" className="button" disabled={isSubmitting}>
                            Find
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default UsersSearchForm