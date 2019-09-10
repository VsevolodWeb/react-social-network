import React from 'react';
import s from './Friends.module.css'


const Friends = (props) => {
    let friends = props.list.map((item) => {
        return (
            <li key={item.id}>
                <span className={s.image}></span>
                <div className={s.name}>{item.name}</div>
            </li>
        )
    })

    return (
        <div>
            <h3 className={s.title}>My Friends</h3>
            <ul className={s.list}>
                {friends}
            </ul>
        </div>
    )
}

export default Friends;