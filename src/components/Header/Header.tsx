import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from './logo.svg';
import s from './Header.module.css'
import {connect} from "react-redux";
import {authLogout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    login: string | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    authLogout: () => void
}
type OwnPropsType = {}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

const Header: React.FC<PropsType> = props => {
    const logoutLink = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        props.authLogout();
    };

    return (
        <header className={s.header}>
            <div className={s.container + " container"}>
                <img src={logo} alt="My Social Work" className={s.logo} />
                <div className={s.login}>
                    {(props.isAuth) ? (
                        <>
                            <div className={s.loginName}>{props.login}</div>
                            <a href="/" onClick={logoutLink} className={s.link}>Logout</a>
                        </>
                    ) : <NavLink to="/login" className={s.link}>Login</NavLink>}
                </div>
            </div>
        </header>
    )
};

const mapStateToProps = (state: AppStateType) => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
};

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {authLogout})(Header);