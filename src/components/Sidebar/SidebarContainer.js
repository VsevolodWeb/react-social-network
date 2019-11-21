import { connect } from 'react-redux';

import Sidebar from './Sidebar';

const mapStateToProps = (state) => {
    return {
        data: state.sidebar,
        users: state.users.list
    }
};

export default connect(mapStateToProps)(Sidebar);