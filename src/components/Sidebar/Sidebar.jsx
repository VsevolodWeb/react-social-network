import React from 'react';
import s from './Sidebar.module.css'
import Menu from './Menu/Menu';
import Friends from './Friends/Friends';

const Column = (props) => {
    return (
        <aside className={s.sidebar}>
            <Menu />
            <Friends list={props.state} />
        </aside>
    )
}

export default Column;