import React from 'react'

import s from './Users.module.css'
import User from './User/User'
import Preloader from '../common/Preloader/Preloader';

const Users = (props) => {
    let pagesCount =  Math.ceil(props.data.totalUsersCount / props.data.pageSize);
    let pagesCountArray = [];

    for(let i = 1; i <= pagesCount; i++) {
        pagesCountArray.push(
            <li className={s.pagination__item + (props.data.currentPage === i ? (" " + s.pagination__item_active) : '')} key={i}>
                <button onClick={() => props.setCurrentPage(i)} className={s.pagination__button}>{i}</button>
            </li>);
    }

    const mapUsers = () => {
        return props.data.list.map(user => <User key={user.id} data={user} action={user.followed ? props.unfollowUser: props.followUser} />)
    };
    
    return <>
            <h1 className="title">Users</h1>
            {props.data.isFetching ? <Preloader /> : null }
            <div className={s.container}>
                {mapUsers()}
            </div>
            <ul className={s.pagination}>
                {pagesCountArray}
            </ul>
        </>
    
};

export default Users;