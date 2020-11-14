import React from 'react';
import s from './Friends.module.css'
import {UserType} from "../../../redux/types/types";

type PropsType = {
    friends: UserType[]
}

const Friends: React.FC<PropsType> = props => {
    return (
        <div>
            <h3 className={s.title}>My Friends</h3>
            <ul className={s.list}>
                {props.friends.map((item) => <li key={item.id}>
                                <span className={s.image} />
                                <div className={s.name}>{item.name}</div>
                            </li>)}
            </ul>
        </div>
    )
};

export default Friends;