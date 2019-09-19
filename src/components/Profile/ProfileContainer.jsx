import {connect} from 'react-redux';

import {addPostActionCreator, updateNewPostActionCreator} from '../../redux/profile-reducer'
import Profile from './Profile';


const mapStateToProps = (state) => {
    return {
        data: state.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator());
        },
        updateNewPost: (value) => {
            dispatch(updateNewPostActionCreator(value));
        }
    }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile)

export default ProfileContainer;