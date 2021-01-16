import React, {FC} from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'

import {maxLength, required} from '../../../../utils/validators'
import {CustomField, Textarea} from '../../../common/FormsControls/FormsControls'
import {MessageFormType} from '../MessageList'
import {Button} from 'antd'
import {WsChannelStatusType} from '../../Chat'

export type OwnPropsType = {
	wsChannelStatus: WsChannelStatusType | null
}

type PropsType = InjectedFormProps<MessageFormType, OwnPropsType> & OwnPropsType
type FieldNameType = 'message'

const maxLength100 = maxLength(100)

export const MessageForm: FC<PropsType> = props => (
	<form onSubmit={props.handleSubmit}>
		<div className="form">
			<CustomField<FieldNameType> name="message" placeholder="Сообщение" component={Textarea}
			                            validate={[required, maxLength100]}/>
			<div className="formGroup">
				<Button type="primary" htmlType="submit"
				        disabled={props.wsChannelStatus !== WebSocket.OPEN}>Отправить</Button>
			</div>
		</div>
	</form>
)

export default reduxForm<MessageFormType, OwnPropsType>({
	form: 'addMessage'
})(MessageForm)