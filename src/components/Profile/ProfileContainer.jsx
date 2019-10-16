import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {addPost, updateNewPost, setUserProfile} from '../../redux/profile-reducer'
import Profile from './Profile';
import { getUserProfile } from '../../api/api';


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(userId) {
            getUserProfile(userId).then(response => {
                this.props.setUserProfile(response);
            });
        }
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

export default connect(mapStateToProps, {addPost, updateNewPost, setUserProfile})(withRouter(ProfileContainer));