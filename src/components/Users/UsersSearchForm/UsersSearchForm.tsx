import React from 'react'
import s from './UsersSearchForm.module.css'
import {Field, Form, Formik} from 'formik'
import validate from './UsersSearchForm.validate'
import cn from 'classnames'
import {UsersFilterType} from '../../../redux/users-reducer'

type PropsType = {
    onFilterChanged: (filter: UsersFilterType) => void
    setCurrentPage: (pageId: number) => void
    filter: UsersFilterType
}

type ValuesType = {
    term: string
    friend: 'null' | 'true' | 'false'
}

const UsersSearchForm: React.FC<PropsType> = React.memo(props => {
    const onSubmit = (values: ValuesType) => {
        props.onFilterChanged({...values, friend: JSON.parse(values.friend)})
    }

    return (
        <Formik<ValuesType>
            initialValues={
                {
                    term: props.filter.term,
                    friend: JSON.stringify(props.filter.friend)
                } as ValuesType
            }
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
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
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