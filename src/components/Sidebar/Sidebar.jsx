import React from 'react';
import s from './Sidebar.module.css'
import Menu from './Menu/Menu';
import Friends from './Friends/Friends';

const Sidebar = (props) => {
    let friends = props.users
                .filter((item) => item.followed)
                .map((item) => {
                    return <li key={item.id}>
                                <span className={s.image}></span>
                                <div className={s.name}>{item.name}</div>
                            </li>
    });

    return (
        <aside className={s.sidebar}>
            <Menu />
            {friends.length ? <Friends data={friends} />: ''}
        </aside>
    )
}

export default Sidebar;