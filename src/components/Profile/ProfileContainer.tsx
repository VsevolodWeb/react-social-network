import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {actions, getUserProfileThunkCreator, getUserStatusThunkCreator,
        updateUserStatusThunkCreator, setUserPhotoThunkCreator,
        saveUserProfileThunkCreator} from '../../redux/profile-reducer'
import Profile from './Profile';
import Preloader from '../common/Preloader/Preloader';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {ProfileType} from "../../redux/types/types";

type MapStateToPropsType = {
    data: ProfileType
    userId: number
}

type MapDispatchToPropsType = {

}

class ProfileContainer extends React.Component<> {
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
    
    componentDidUpdate(prevProps, prevState, snapshot) {
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
        addPost: actions.addPost, getUserProfile: getUserProfileThunkCreator, getUserStatus: getUserStatusThunkCreator,
        updateUserStatus: updateUserStatusThunkCreator, resetForm: actions.resetForm, updateUserPhoto: setUserPhotoThunkCreator,
        saveUserProfile: saveUserProfileThunkCreator
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)