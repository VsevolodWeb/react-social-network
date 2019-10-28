import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {addPost, updateNewPost, getUserProfileThunkCreator, getUserStatusThunkCreator} from '../../redux/profile-reducer'
import Profile from './Profile';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


class ProfileContainer extends React.Component {
    componentDidMount() {
        let resultUserId = this.props.match.params.userId || this.props.userId;

        if(resultUserId) {
            this.props.getUserProfile(resultUserId);
            this.props.getUserStatus(resultUserId);
        } 
    }

    render() {
        let userProfile = this.props.data.userProfile;
        
        if(!userProfile) {
            return <Preloader />
        }

        if(userProfile.userId !== parseInt(this.props.match.params.userId) && (userProfile.userId !== this.props.userId)) {
            return <Preloader />
        }

        return <Profile {...this.props} />
    }
}


const mapStateToProps = (state) => {
    return {
        data: state.profile,
        userId: state.auth.id
    }
}


export default compose(
    connect(mapStateToProps, {
        addPost, updateNewPost, getUserProfile: getUserProfileThunkCreator, getUserStatus: getUserStatusThunkCreator
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)