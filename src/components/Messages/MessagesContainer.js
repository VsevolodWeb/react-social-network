import {compose} from 'redux';
import {connect} from 'react-redux';

import {addMessage, updateNewMessage} from '../../redux/dialogs-reducer';
import Messages from './Messages';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogs
    }
}


export default compose(
    connect(mapStateToProps, {addMessage, updateNewMessage}), 
    withAuthRedirect
)(Messages)