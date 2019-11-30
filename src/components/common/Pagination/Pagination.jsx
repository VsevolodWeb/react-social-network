import React from 'react';
import s from './Pagination.module.css'

const Pagination = props => {
    let pagesCount =  Math.ceil(props.totalCount / props.pageSize);
    let pagesCountArray = [];
    const portion = 10;
    const halfPortion = portion / 2;

    let startCount = 1;
    let endCount = portion;

    if(!pagesCount) {
        return null;
    }

    if(props.currentPage > halfPortion && props.currentPage < pagesCount - halfPortion) {
        startCount = props.currentPage - halfPortion;
        endCount = props.currentPage + halfPortion;
    } else if(props.currentPage >= pagesCount - halfPortion) {
        startCount = pagesCount - portion;
        endCount = pagesCount;
    }

    for(let i = startCount; i <= endCount; i++) {
        pagesCountArray.push(
            <li className={s.pagination__item + (props.currentPage === i ? (" " + s.pagination__item_active) : "")} key={i}>
                <button onClick={() => props.setCurrentPage(i)} className={s.pagination__button}>{i}</button>
            </li>);
    }

    const changePage = direction => {
        let currentPageId = props.currentPage;

        switch (direction) {
            case 'prev':
                currentPageId -= 1;
                break;
            case 'next':
                currentPageId += 1;
                break;
            default:
                return;
        }

        props.setCurrentPage(currentPageId);
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