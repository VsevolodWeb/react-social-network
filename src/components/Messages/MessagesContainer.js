import {connect} from 'react-redux';

import {addMessage, updateNewMessage} from '../../redux/dialogs-reducer'
import Messages from './Messages';

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogs
    }
}


export default connect(mapStateToProps, {addMessage, updateNewMessage})(Messages);