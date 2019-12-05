import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {addPost, getUserProfileThunkCreator, getUserStatusThunkCreator, updateUserStatusThunkCreator, resetPost} from '../../redux/profile-reducer'
import Profile from './Profile';
import Preloader from '../common/Preloader/Preloader';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';


class ProfileContainer extends React.Component {
    getUserInfo() {
        let resultUserId = this.props.match.params.userId || this.props.userId;
        if(resultUserId) {
            this.props.getUserProfile(resultUserId);
            this.props.getUserStatus(resultUserId);
        }
    } 

    componentDidMount() {
        this.getUserInfo();
    }
    
    componentDidUpdate(prevProps) {
        if(prevProps.match.params.userId !== this.props.match.params.userId) {
            this.getUserInfo();
        }
    }

    render() {
        return this.props.data.isFetching ? <Preloader /> : <Profile {...this.props} />;
    }
}


const mapStateToProps = state => {
    return {
        data: state.profile,
        userId: state.auth.id
    }
};


export default compose(
    connect(mapStateToProps, {
        addPost, getUserProfile: getUserProfileThunkCreator, getUserStatus: getUserStatusThunkCreator,
        updateUserStatus: updateUserStatusThunkCreator, resetPost
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)