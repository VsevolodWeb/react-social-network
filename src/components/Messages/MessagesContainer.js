import {compose} from 'redux'
import {connect} from 'react-redux'

import {actions} from '../../redux/dialogs-reducer'
import Messages from './Messages'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'


const mapStateToProps = state => {
    return {
        dialogs: state.dialogs
    }
}

export default compose(
    connect(mapStateToProps, {addMessage: actions.addMessage, resetMessage: actions.resetMessage}),
    withAuthRedirect
)(Messages)