import {connect} from 'react-redux';

import {setUsersActionCreator, showMoreActionCreator, followActionCreator, unfollowActionCreator} from '../../redux/users-reducer'
import Users from './Users';


const mapStateToProps = (state) => {
    return {
        data: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUsers: (users) => {
            dispatch(setUsersActionCreator(users));
        },
        showMore: () => {
            dispatch(showMoreActionCreator());
        },
        follow: (id) => {
            dispatch(followActionCreator(id));
        },
        unfollow: (id) => {
            dispatch(unfollowActionCreator(id));
        }
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer;