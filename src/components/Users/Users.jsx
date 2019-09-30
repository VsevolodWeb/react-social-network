import React from 'react'
import s from './Users.module.css'

const Users = (props) => {
    let pagesCount =  Math.ceil(this.props.data.totalUsersCount / this.props.data.pageSize);
    let pagesCountArray = [];

    for(let i = 1; i <= pagesCount; i++) {
        pagesCountArray.push(
            <li className={s.pagination__item + (this.props.data.currentPage === i ? (" " + s.pagination__item_active) : '')} key={i}>
                <button onClick={() => this.setCurrentPage(i)} className={s.pagination__button}>{i}</button>
            </li>);
    }
    
    return <>
            <h1 className="title">Users</h1>
            <div className={s.container}>{this.mapUsers()}</div>
            <ul className={s.pagination}>
                {pagesCountArray}
            </ul>
        </>
    
};

export default Users;