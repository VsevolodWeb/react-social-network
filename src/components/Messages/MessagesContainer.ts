import {compose} from 'redux'
import {connect} from 'react-redux'

import {actions} from '../../redux/dialogs-reducer'
import Messages from './Messages'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import {AppStateType} from "../../redux/redux-store"
import {DialogType} from "../../redux/types/types"


export type MapStateToPropsType = {dialogs: Array<DialogType>}
export type MapDispatchToPropsType = {
    addMessage: typeof actions.addMessage
    resetMessage: typeof actions.resetMessage
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({dialogs: state.dialogs.dialogsData})

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {addMessage: actions.addMessage, resetMessage: actions.resetMessage}),
    withAuthRedirect
)(Messages)