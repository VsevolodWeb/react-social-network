import {connect} from 'react-redux';

import {addPostActionCreator, updateNewPostActionCreator} from '../../../redux/profile-reducer'
import Posts from './Posts';

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

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts)

export default PostsContainer;