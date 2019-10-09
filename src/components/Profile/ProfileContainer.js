import {connect} from 'react-redux';

import {addPost, updateNewPost} from '../../redux/profile-reducer'
import Profile from './Profile';


const mapStateToProps = (state) => {
    return {
        data: state.profile
    }
}

export default connect(mapStateToProps, {addPost, updateNewPost})(Profile);