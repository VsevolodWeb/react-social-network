import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {AppStateType} from "../redux/redux-store";

export const withAuthRedirect = (Component: any) => {

    type MapStateToPropsType = {
        isAuth: boolean
        userId: number | null
    }

    type MapDispatchToProps = {}
    type OwProps = {}

    type PropsType = MapStateToPropsType & MapDispatchToProps & OwProps;

    class RedirectComponent extends React.Component<PropsType> {
        render() {
            if(!this.props.isAuth) return <Redirect to="/login" />;
            return <Component {...this.props} />
        }
    }

    const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
        isAuth: state.auth.isAuth,
        userId: state.auth.id
    });

    return connect<MapStateToPropsType, MapDispatchToProps, OwProps, AppStateType>(mapStateToProps)(RedirectComponent);
};