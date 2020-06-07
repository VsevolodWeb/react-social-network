import dialogsReducer from './dialogs-reducer'
import profileReducer from './profile-reducer'

let _store = {
    _state: {
        profile: {
            postsData: [
                {id: '1', text: 'Hello', name: 'Vsevolod', likeCount: '1'},
                {id: '2', text: 'Hello', name: 'Ekaterina', likeCount: '3'}
            ],
            newPostValue: '',
        },
        dialogs: {
            dialogsData: [
                {
                    id: 1,
                    name: 'Ekaterina',
                    messages: [
                        {id: 1, text: 'Привет', from: 'Ekaterina'},
                        {id: 2, text: 'Привет!', from: 'Vsevolod'},
                        {id: 3, text: 'Как дела?', from: 'Ekaterina'}
                    ]
                },
                {
                    id: 2,
                    name: 'Leonid',
                    messages: [
                        {id: 1, text: 'Как дела?', from: 'Leonid'},
                        {id: 2, text: 'Отлично!', from: 'Vsevolod'}
                    ]
                }
            ],
            newMessageValue: ''
        },
        friends: [
            {id: 1, name: 'Vladimir'},
            {id: 2, name: 'Jana'},
            {id: 3, name: 'Elena'}
        ]
    },
    _callSubscriber() {
        console.log('State changed');
    },
    
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.dialogs = dialogsReducer(this._state.dialogs, action);
        this._state.profile = profileReducer(this._state.profile, action);

        this._callSubscriber(this._state);
    }
};

export default _store;