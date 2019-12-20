import React from 'react';
import cn from 'classnames'
import s from './Pagination.module.css'

const Pagination = props => {
    let pagesCount =  Math.ceil(props.totalCount / props.pageSize);
    let pagesCountArray = [];
    let currentPage = props.currentPage;
    const portion = 10;
    const halfPortion = portion / 2;

    let startCount = 1;
    let endCount = portion;

    if(!pagesCount) {
        return null;
    }

    if(currentPage > halfPortion && currentPage < pagesCount - halfPortion) {
        startCount = currentPage - halfPortion;
        endCount = currentPage + halfPortion;
    } else if(currentPage >= pagesCount - halfPortion) {
        startCount = pagesCount - portion;
        endCount = pagesCount;
    }

    for(let i = startCount; i <= endCount; i++) {
        pagesCountArray.push(
            <li className={cn(s.pagination__item, {[s.pagination__item_active]: currentPage === i})} key={i}>
                <button onClick={() => props.setCurrentPage(i)} className={s.pagination__button}>{i}</button>
            </li>);
    }

    const changePage = direction => {
        switch (direction) {
            case 'prev':
                currentPage -= 1;
                break;
            case 'next':
                currentPage += 1;
                break;
            default:
                return;
        }

        props.setCurrentPage(currentPage);
    }

    return (
        <section className={s.wrapper}>
            {props.currentPage !== 1 ? <button onClick={() => {changePage('prev')}}>Prev</button> : null}
            <ul className={s.pagination}>
                {pagesCountArray}
            </ul>
            {props.currentPage !== pagesCount ? <button onClick={() => {changePage('next')}}>Next</button> : null}
        </section>
    );
};

export default Pagination;