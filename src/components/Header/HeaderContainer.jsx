import React from 'react';
import {connect} from 'react-redux';
import {setUserData} from '../../redux/auth-reducer'
import Header from './Header'
import { authMe } from '../../api/api';


class HeaderContainer extends React.Component {
    componentDidMount() {
        authMe().then(response => {
            if (response.resultCode === 0) {
                this.props.setUserData(response.data);
            }
        });
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {setUserData})(HeaderContainer);