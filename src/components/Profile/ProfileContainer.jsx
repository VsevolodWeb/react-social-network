import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {addPost, updateNewPost} from '../../redux/profile-reducer'
import Profile from './Profile';


class ProfileContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.data.currentPage}&count=${this.props.data.pageSize}`)
            .then(response => {
                this.props.setTotalUsersCount(response.data.totalCount);
                this.props.setUsers(response.data.items);
                this.props.setIsFetching(false);
        });
    }

    render() {
        console.log(this.props)
        return <Profile data={this.props}  />
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.profile
    }
}

export default connect(mapStateToProps, {addPost, updateNewPost})(ProfileContainer);