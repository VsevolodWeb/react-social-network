import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {addPost, updateNewPost, setUserProfile, getUserProfileThunkCreator, getUserStatusThunkCreator} from '../../redux/profile-reducer'
import Profile from './Profile';
//import { withAuthRedirect } from '../../hoc/withAuthRedirect';


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        return <Profile {...this.props} />
    }
}


const mapStateToProps = (state) => {
    return {
        data: state.profile
    }
}


export default compose(
    connect(mapStateToProps, {addPost, updateNewPost, setUserProfile,
        getUserProfile: getUserProfileThunkCreator, getUserStatus: getUserStatusThunkCreator}),
    withRouter,
    //withAuthRedirect
)(ProfileContainer)