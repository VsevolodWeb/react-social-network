import React, {FC} from 'react'
import {useSelector} from 'react-redux'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {maxLength, required} from '../../../../utils/validators'
import {CustomField, Textarea} from '../../../common/FormsControls/FormsControls'
import {MessageFormType} from '../MessageList'
import {Button} from 'antd'
import {getChatStatusCode} from '../../../../redux/chat-selectors'


export type OwnPropsType = {}

type PropsType = InjectedFormProps<MessageFormType, OwnPropsType> & OwnPropsType
type FieldNameType = 'message'

const maxLength100 = maxLength(100)

export const MessageForm: FC<PropsType> = props => {
	const statusCode = useSelector(getChatStatusCode)

	return (
		<form onSubmit={props.handleSubmit}>
			<div className="form">
				<CustomField<FieldNameType> name="message" placeholder="Сообщение" component={Textarea}
				                            validate={[required, maxLength100]}/>
				<div className="formGroup">
					<Button type="primary" htmlType="submit" disabled={statusCode !== WebSocket.OPEN}>Отправить</Button>
				</div>
			</div>
		</form>
	)
}

export default reduxForm<MessageFormType, OwnPropsType>({
	form: 'addMessage'
})(MessageForm)