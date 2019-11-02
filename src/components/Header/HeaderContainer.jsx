import React from 'react';
import {connect} from 'react-redux';
import {setUserData, authMeThunkCreator} from '../../redux/auth-reducer'
import Header from './Header'


class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.authMe();
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = state => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {setUserData, authMe: authMeThunkCreator})(HeaderContainer);