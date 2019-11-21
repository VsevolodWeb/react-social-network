import React from 'react';
import s from './Pagination.module.css'

const Pagination = props => {
    let pagesCount =  Math.ceil(props.totalUsersCount / props.pageSize);
    let pagesCountArray = [];

    for(let i = 1; i <= pagesCount; i++) {
        pagesCountArray.push(
            <li className={s.pagination__item + (props.currentPage === i ? (" " + s.pagination__item_active) : '')} key={i}>
                <button onClick={() => props.setCurrentPage(i)} className={s.pagination__button}>{i}</button>
            </li>);
    }
    return <ul className={s.pagination}>{pagesCountArray}</ul>
};

export default Pagination;


