import React from 'react';
import s from './Sidebar.module.css'
import Menu from './Menu/Menu';
import Friends from './Friends/Friends';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {UserType} from "../../redux/types/types";

type MapStateToProps = {}
type MapDispatchToProps = {}
type OwnPropsType = {
    users: UserType[]
}
type PropsType = MapStateToProps & MapDispatchToProps & OwnPropsType

const Sidebar: React.FC<PropsType> = (props) => {
    let friends = props.users.filter((item) => item.followed);

    return (
        <aside className={s.sidebar}>
            <Menu />
            {friends.length ? <Friends friends={friends} />: ''}
        </aside>
    )
};

const mapStateToProps = (state: AppStateType) => {
    return {
        users: state.users.list
    }
};

export default connect(mapStateToProps)(Sidebar);