import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import queryString from 'query-string'
import {StringParam, useQueryParams} from 'use-query-params'

import Users from './Users'
import Pagination from '../common/Pagination/Pagination'
import {actions, getUsersThunkCreator} from '../../redux/users-reducer'
import Preloader from '../common/Preloader/Preloader'
import {
	getUsersCurrentPage,
	getUsersFilter,
	getUsersIsFetching,
	getUsersPageSize,
	getUsersTotalUsersCount
} from '../../redux/users-selectors'
import useWithAuthRedirect from '../../hooks/useWithAuthRedirect'


type QueryType = {
	term?: string
	page?: string
	friend?: string
}

export const UsersPage = () => {
	const isFetching = useSelector(getUsersIsFetching),
		currentPage = useSelector(getUsersCurrentPage),
		totalUsersCount = useSelector(getUsersTotalUsersCount),
		pageSize = useSelector(getUsersPageSize),
		filter = useSelector(getUsersFilter)

	const dispatch = useDispatch()
	const history = useHistory()
	const isRedirect = useWithAuthRedirect()

	const [, setQuery] = useQueryParams({
		term: StringParam,
		friend: StringParam,
		page: StringParam,
	});

	const setCurrentPage = (pageId: number) => {
		dispatch(actions.setCurrentPage(pageId))
	}

	const getUriParamsEffect = () => {
		const searchParsed = queryString.parse(history.location.search) as QueryType

		let actualPage = (searchParsed.page && +searchParsed.page) || currentPage
		let actualFilter = {term: searchParsed.term || '', friend: searchParsed.friend || 'null'}

		dispatch(actions.setCurrentPage(actualPage))
		dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter))
	}
	useEffect(getUriParamsEffect, [])

	useEffect(() => {
		let query: QueryType = {}

		if(filter.term) query.term = filter.term
		if(filter.friend !== 'null') query.friend = filter.friend
		if(currentPage !== 1) query.page = filter.friend

		setQuery(query, 'replace')
	}, [filter, currentPage, setQuery])

	return isFetching ? <Preloader/> : isRedirect || <>
			<Users isFetching={isFetching}/>
			<Pagination setCurrentPage={setCurrentPage}
			            currentPage={currentPage}
			            totalCount={totalUsersCount}
			            pageSize={pageSize}
			/>
		</>
}