import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import {
    actions, getUserProfileThunkCreator, getUserStatusThunkCreator,
    updateUserStatusThunkCreator, setUserPhotoThunkCreator,
    saveUserProfileThunkCreator
} from '../../redux/profile-reducer'
import Profile from './Profile';
import Preloader from '../common/Preloader/Preloader';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {ProfileType} from "../../redux/types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
    addPost: typeof actions.addPost
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    resetForm: typeof actions.resetForm
    updateUserPhoto: (photo: File) => void
    saveUserProfile: (userInfo: ProfileType) => Promise<any>
}
type OwnPropsType = {}
export type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType & RouteComponentProps<{userId?: string}>

class ProfileContainer extends React.Component<PropsType> {
    getUserInfo() {
        let resultUserId = this.props.match.params.userId ? parseInt(this.props.match.params.userId) : this.props.userId;

        if(resultUserId) {
            this.props.getUserProfile(resultUserId);
            this.props.getUserStatus(resultUserId);
        }
    } 

    componentDidMount() {
        this.getUserInfo();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if(prevProps.match.params.userId !== this.props.match.params.userId) {
            this.getUserInfo();
        }
    }

    render() {
        return this.props.data.isFetching ? <Preloader /> : <Profile {...this.props} />;
    }
}


const mapStateToProps = (state: AppStateType) => {
    return {
        data: state.profile,
        userId: state.auth.id
    }
};


export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        addPost: actions.addPost, getUserProfile: getUserProfileThunkCreator, getUserStatus: getUserStatusThunkCreator,
        updateUserStatus: updateUserStatusThunkCreator, resetForm: actions.resetForm, updateUserPhoto: setUserPhotoThunkCreator,
        saveUserProfile: saveUserProfileThunkCreator
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)