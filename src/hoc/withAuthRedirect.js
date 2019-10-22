import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Preloader from '../components/common/Preloader/Preloader';


export const withAuthRedirect = Component => {
    class RedirectComponent extends React.Component {
        constructor(props) {
            super(props);
            this.authFlag = true;
        }

        render() {
            if(!this.props.isAuth) {
                this.authFlag = !this.authFlag;
                return this.authFlag ? <Redirect to="/login" /> : <Preloader />;
            }
            return <Component {...this.props} />
        }
    }

    const mapStateToProps = state => ({
        isAuth: state.auth.isAuth
    });

    return connect(mapStateToProps)(RedirectComponent);
}