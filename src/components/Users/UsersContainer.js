import {connect} from 'react-redux';

import {setUsersActionCreator, setCurrentPageActionCreator,
        followActionCreator, unfollowActionCreator, setTotalUsersCountActionCreator} from '../../redux/users-reducer'
import UsersAPIContainer from './UsersAPIContainer';


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
        setCurrentPage: (value) => {
            dispatch(setCurrentPageActionCreator(value));
        },
        setTotalUsersCount: (totalUsersCount) => {
            dispatch(setTotalUsersCountActionCreator(totalUsersCount));
        },
        follow: (id) => {
            dispatch(followActionCreator(id));
        },
        unfollow: (id) => {
            dispatch(unfollowActionCreator(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersAPIContainer);