import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {setUserData} from '../../redux/auth-reducer'
import Header from './Header'


class HeaderContainer extends React.Component {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {withCredentials: true})
                .then(response => {
                    if (response.data.resultCode === 0) {
                        this.props.setUserData(response.data.data);
                    }
                });
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.auth
    }
}

export default connect(mapStateToProps, {setUserData})(HeaderContainer);