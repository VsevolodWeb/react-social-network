import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {AppStateType} from "../redux/redux-store";

export const withAuthRedirect = (Component: React.ComponentType) => {

    type MapStateToPropsType = {
        isAuth: boolean
        userId: number | null
    }

    type MapDispatchToProps = {}
    type OwProps = {}

    type PropsType = MapStateToPropsType & MapDispatchToProps & OwProps;

    const RedirectComponent: React.FC<PropsType> = props => {
        const {isAuth, ...restProps} = props

        if (!isAuth) return <Redirect to="/login"/>

        return <Component {...restProps} />
    }

    const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
        isAuth: state.auth.isAuth,
        userId: state.auth.id
    });

    return connect<MapStateToPropsType, MapDispatchToProps, OwProps, AppStateType>(mapStateToProps)(RedirectComponent);
};