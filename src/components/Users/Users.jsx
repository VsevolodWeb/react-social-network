import React from 'react';
import User from './User/User';
import s from './Users.module.css'
import axios from 'axios';


class Users extends React.Component {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                this.props.data.totalUsersCount = response.data.totalCount;

                return this.props.setUsers(response.data.items)
        });
    }

    mapUsers() {
        return this.props.data.list.map(user => <User key={user.id} data={user} action={user.followed ? this.props.unfollow: this.props.follow} />)
    };

    render() {
        let pagesCount =  Math.ceil(this.props.data.totalUsersCount / this.props.data.pageSize);
        let pagesCountArray = []

        for(let i = 1; i <= pagesCount; i++) {
            pagesCountArray = [...pagesCountArray,
                <li className={s.pagination__item + " " + s.pagination__item_active} key={i}>
                    <a href="/" className={s.pagination__link}>{i}</a>
                </li>]
        }
        
        return <>
                <h1 className="title">Users</h1>
                <div className={s.container}>{this.mapUsers()}</div>
                <ul className={s.pagination}>
                    {pagesCountArray}
                </ul>
            </>
    };
}

export default Users;