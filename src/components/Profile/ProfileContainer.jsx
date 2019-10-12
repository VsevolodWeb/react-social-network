import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {addPost, updateNewPost, setUserProfile} from '../../redux/profile-reducer'
import Profile from './Profile';


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(userId) {
            axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
                .then(response => {
                    this.props.setUserProfile(response.data);
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