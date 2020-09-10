import React from 'react'
import s from './UsersSearchForm.module.css'
import {Field, Form, Formik} from 'formik'
import validate from './UsersSearchForm.validate'
import cn from 'classnames'
import {getUsersThunkCreator, UsersFilterType} from '../../../redux/users-reducer'
import {useDispatch, useSelector} from "react-redux";
import {getUsersFilter, getUsersPageSize} from "../../../redux/users-selectors";

type ValuesType = {
	term: string
	friend: 'null' | 'true' | 'false'
}

const UsersSearchForm: React.FC = React.memo(() => {
	const pageSize = useSelector(getUsersPageSize),
        filter = useSelector(getUsersFilter)

	const dispatch = useDispatch()

	const onFilterChanged = (filter: UsersFilterType) => {
		dispatch(getUsersThunkCreator(1, pageSize, filter))
	}

	const onSubmit = (values: ValuesType) => {
		onFilterChanged({...values, friend: JSON.parse(values.friend)})
	}

	return (
		<Formik<ValuesType>
			initialValues={
				{
					term: filter.term,
					friend: JSON.stringify(filter.friend)
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