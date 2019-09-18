import React from 'react';
import s from './Sidebar.module.css'
import Menu from './Menu/Menu';
import Friends from './Friends/Friends';

const Sidebar = (props) => {
    return (
        <aside className={s.sidebar}>
            <Menu />
            <Friends data={props.data.friends} />
        </aside>
    )
}

export default Sidebar;