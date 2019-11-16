import React from 'react';
import s from './Friends.module.css'


const Friends = (props) => {
    return (
        <div>
            <h3 className={s.title}>My Friends</h3>
            <ul className={s.list}>
                {props.data}
            </ul>
        </div>
    )
};

export default Friends;