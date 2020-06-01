import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './User.module.css'
import avatar from '../../../components/Profile/Info/avatar.jpg';
import {UserType} from "../../../redux/types/types";

type PropsType = {
    user: UserType
    action: (userId: number) => void
    isFollowingArray: Array<number>
}

const User: React.FC<PropsType> = props => {
    let imgSource = props.user.photos.large || ""

    return <div className={s.item}>
                <NavLink to={`profile/${props.user.id}`}>
                    <span className={s.avatar} style={{ backgroundImage: `url(${imgSource || avatar})` }} />
                </NavLink>
                <div className={s.name}>{props.user.name}</div>
                <div className={s.status}>{props.user.status}</div>
                <button className={s.button + " button"}
                        onClick={() => props.action(props.user.id)}
                        disabled={props.isFollowingArray.some(el => el === props.user.id) ? true: undefined}
                >
                    {props.user.followed ? 'Unfollow': 'Follow'}
                </button>
           </div>
};

export default User;