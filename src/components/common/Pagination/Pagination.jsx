import React from 'react';
import s from './Pagination.module.css'

const Pagination = props => {
    let pagesCount =  Math.ceil(props.totalCount / props.pageSize);
    let pagesCountArray = [];
    const portion = 10;

    let startCount = 1;
    let endCount = portion;
    if(props.currentPage > portion / 2 && props.currentPage < pagesCount - 5) {
        startCount = props.currentPage - portion / 2;
        endCount = props.currentPage + portion / 2;
    }

    
   

    for(let i = startCount; i <= endCount; i++) {
        pagesCountArray.push(
            <li className={s.pagination__item + (props.currentPage === i ? (" " + s.pagination__item_active) : "")} key={i}>
                <button onClick={() => props.setCurrentPage(i)} className={s.pagination__button}>{i}</button>
            </li>);
    }
    return <>
            <button>Prev</button>
            <ul className={s.pagination}>
                {pagesCountArray}
            </ul>
            <button>Next</button>
        </>
};

export default Pagination;