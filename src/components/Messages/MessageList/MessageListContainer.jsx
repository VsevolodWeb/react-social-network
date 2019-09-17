import {connect} from 'react-redux';

import {addMessageActionCreator, messageChangeActionCreator} from '../../../redux/dialogs-reducer'
import MessageList from './MessageList';

const mapStateToProps = (state) => {
    return {
        dialog: state.dialog,
        newMessageValue: state.newMessageValue
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {
            dispatch(addMessageActionCreator(1));
        },
        updateNewPost: (value) => {
            dispatch(messageChangeActionCreator(value));
        }
    }
}

const MessageListContainer = connect(mapStateToProps, mapDispatchToProps)(MessageList)

export default MessageListContainer;