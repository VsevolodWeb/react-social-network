import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'
import useQueryParams, { NumberParam, StringParam } from 'use-query-params'

import Users from './Users'
import Pagination from '../common/Pagination/Pagination'
import {actions, getUsersThunkCreator} from '../../redux/users-reducer'
import Preloader from '../common/Preloader/Preloader'
import {
	getUsersCurrentPage, getUsersFilter,
	getUsersIsFetching,
	getUsersPageSize,
	getUsersTotalUsersCount
} from "../../redux/users-selectors";
import useWithAuthRedirect from '../../hooks/useWithAuthRedirect'


export const UsersPage = () => {
	const isFetching = useSelector(getUsersIsFetching),
		currentPage = useSelector(getUsersCurrentPage),
		totalUsersCount = useSelector(getUsersTotalUsersCount),
		pageSize = useSelector(getUsersPageSize),
		filter = useSelector(getUsersFilter)

	const [query, setQuery] = useQueryParams({
		term: StringParam,
		friend: StringParam,
		page: NumberParam,
	});

	const dispatch = useDispatch()
	const history = useHistory()
	const isRedirect = useWithAuthRedirect()

	const setCurrentPage = (pageId: number) => {
		dispatch(actions.setCurrentPage(pageId))
	}

	const getUriParamsEffect = () => {
		const searchParsed = queryString.parse(history.location.search)

		let actualPage = currentPage
		let actualFilter = filter

		if(searchParsed.page) actualPage = +searchParsed.page
		if(searchParsed.term) actualFilter = {...actualFilter, term: searchParsed.term as string}
		if(searchParsed.friend) actualFilter = {...actualFilter, friend: JSON.parse(searchParsed.friend as string)}

		dispatch(actions.setCurrentPage(actualPage))
		dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter))
	}
	useEffect(getUriParamsEffect, [])

	useEffect(() => {
		history.push({
			pathname: '/users',
			search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
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