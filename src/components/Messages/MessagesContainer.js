import {connect} from 'react-redux';

import {addMessageActionCreator, messageChangeActionCreator} from '../../redux/dialogs-reducer'
import Messages from './Messages';

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (id) => {
            dispatch(addMessageActionCreator(id));
        },
        updateNewMessage: (value) => {
            dispatch(messageChangeActionCreator(value));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);