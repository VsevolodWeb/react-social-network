import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import queryString, {ParsedQuery} from 'query-string'
import {useQueryParams, NumberParam, StringParam } from 'use-query-params'

import Users from './Users'
import Pagination from '../common/Pagination/Pagination'
import {actions, getUsersThunkCreator, UsersFilterType} from '../../redux/users-reducer'
import Preloader from '../common/Preloader/Preloader'
import {
	getUsersCurrentPage, getUsersFilter,
	getUsersIsFetching,
	getUsersPageSize,
	getUsersTotalUsersCount
} from "../../redux/users-selectors";
import useWithAuthRedirect from '../../hooks/useWithAuthRedirect'


type QueryType = {
	term: string
	page: string
	friend: string
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

	const [query, setQuery] = useQueryParams({
		term: StringParam,
		friend: StringParam,
		page: NumberParam,
	});

	const setCurrentPage = (pageId: number) => {
		dispatch(actions.setCurrentPage(pageId))
	}

	const getUriParamsEffect = () => {
		const searchParsed = queryString.parse(history.location.search) as QueryType

		let actualPage = +searchParsed.page || currentPage
		let actualFilter = {term: searchParsed.term || '', friend: searchParsed.friend || 'null'}

		dispatch(actions.setCurrentPage(actualPage))
		dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter))
	}
	useEffect(getUriParamsEffect, [])

	useEffect(() => {
		let query: UsersFilterType = {}
		if(filter.term) query.term = filter.term
		if(filter.friend) query.friend = filter.friend
		if(currentPage !== 1) query.page = filter.friend
		setQuery({
			term: filter.term,
			friend: filter.friend,
			page: currentPage
		})
	}, [filter, currentPage, history])

	return isFetching ? <Preloader/> : isRedirect || <>
			<Users isFetching={isFetching}/>
			<Pagination setCurrentPage={setCurrentPage}
			            currentPage={currentPage}
			            totalCount={totalUsersCount}
			            pageSize={pageSize}
			/>
		</>
}