import {connect} from 'react-redux';

import Sidebar from './Sidebar';

const mapStateToProps = (state) => {
    return {
        data: state.sidebar
    }
}

const SidebarContainer = connect(mapStateToProps)(Sidebar)

export default SidebarContainer;