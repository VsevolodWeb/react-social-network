import {connect} from 'react-redux';

import {setUsersActionCreator, setCurrentPageActionCreator, followActionCreator, unfollowActionCreator} from '../../redux/users-reducer'
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
        setCurrentPage: (value) => {
            dispatch(setCurrentPageActionCreator(value));
        },
        follow: (id) => {
            dispatch(followActionCreator(id));
        },
        unfollow: (id) => {
            dispatch(unfollowActionCreator(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);