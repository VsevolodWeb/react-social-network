import React from 'react';
import s from './Column.module.css'
import Menu from './Menu/Menu';
import Friends from './Friends/Friends';

const Column = (props) => {
    return (
        <aside className={s.column}>
            <Menu />
            <Friends list={props.state}/>
        </aside>
    )
}

export default Column;