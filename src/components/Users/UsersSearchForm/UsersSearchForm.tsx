import React from 'react'
import s from './UsersSearchForm.module.css'
import {Field, Form, Formik, FormikHelpers} from 'formik'
import validate from './UsersSearchForm.validate'
import cn from 'classnames'
import {UsersFilterType} from '../../../redux/users-reducer'

type PropsType = {
    onFilterChanged: (filter: UsersFilterType) => void
    setCurrentPage: (pageId: number) => void
    filter: UsersFilterType
}

const UsersSearchForm: React.FC<PropsType> = React.memo(props => {
    const onSubmit = (values: UsersFilterType, {setSubmitting}: FormikHelpers<UsersFilterType>) => {
        props.onFilterChanged(values)
    }

    return (
        <Formik<UsersFilterType>
            initialValues={{term: props.filter.term}}
            validate={validate}
            onSubmit={onSubmit}
        >
            {({isSubmitting}) => (
                <Form>
                    <div className={cn('form', s.form)}>
                        <Field type="text" name="term" placeholder="Search fo users" className="textElement"/>
                        <Field
                            name="friend"
                            className="textElement"
                            as="select"
                        >
                            <option value="">All</option>
                            <option value="">Only followed</option>
                            <option value="">Only unfollowed</option>
                        </Field>
                        <button type="submit" className="button" disabled={isSubmitting}>
                            Find
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
})

export default UsersSearchForm