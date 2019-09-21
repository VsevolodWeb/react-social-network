import {connect} from 'react-redux';

import Sidebar from './Sidebar';

const mapStateToProps = (state) => {
    return {
        data: state.sidebar,
        users: state.users.users
    }
}

export default connect(mapStateToProps)(Sidebar);