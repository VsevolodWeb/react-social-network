import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {AppStateType} from "../redux/redux-store";

export const withAuthRedirect = (Component: any) => {

    type PropsType = {
        isAuth: boolean
        userId: number
    }

    class RedirectComponent extends React.Component<PropsType> {
        render() {
            if(!this.props.isAuth) return <Redirect to="/login" />;
            return <Component {...this.props} />
        }
    }

    const mapStateToProps = (state: AppStateType) => ({
        isAuth: state.auth.isAuth,
        userId: state.auth.id
    });

    return connect(mapStateToProps)(RedirectComponent);
};