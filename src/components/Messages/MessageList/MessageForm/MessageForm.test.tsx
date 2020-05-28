import React from 'react';
import renderer, {act} from 'react-test-renderer';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import {MessageForm, OwnPropsType} from './MessageForm';
import {MessageFormType} from "../MessageList";

const store = createStore(() => ({}));
const Decorated = reduxForm<MessageFormType, OwnPropsType>({
    form: 'addMessage'
})(MessageForm);

describe('Products Component snapshot', () => {
    const component = renderer.create(
        <Provider store={store}>
            <Decorated/>
        </Provider>
    );

    it('show form', () => {
        const formElement = component!.root.findByType('form')
        let data;

        act(() => {
            data = formElement!.props.onSubmit();
        })

        console.log(data)

        expect(component).toMatchSnapshot()
    });
});