import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {addPost, updateNewPost, setUserProfile, getUserProfileThunkCreator} from '../../redux/profile-reducer'
import Profile from './Profile';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.getUserProfile(this.props.match.params.userId);
    }

    render() {
        return <Profile {...this.props} />
    }
}

const AuthRedirectComponent = withAuthRedirect(ProfileContainer);

const mapStateToProps = (state) => {
    return {
        data: state.profile
    }
}

export default connect(mapStateToProps,
    {addPost, updateNewPost, setUserProfile, getUserProfile: getUserProfileThunkCreator}
)(withRouter(AuthRedirectComponent));