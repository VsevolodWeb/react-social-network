const ADD_POST = 'ADD-POST';
const POST_CHANGE = 'POST-CHANGE';
const ADD_MESSAGE = 'ADD-MESSAGE';
const MESSAGE_CHANGE = 'MESSAGE-CHANGE';

let store = {
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
        switch (action.type) {

            case ADD_POST:
                let newPost = {
                    id: this._state.profile.postsData.length + 1,
                    text: this._state.profile.newPostValue,
                    name: 'Vsevolod',
                    likeCount: 0
                };
            
                this._state.profile.postsData.push(newPost);
                this._state.profile.newPostValue = '';
                this._callSubscriber(this._state);
                break;

            case POST_CHANGE:
                this._state.profile.newPostValue = action.value;
                this._callSubscriber(this._state);
                break;

            case ADD_MESSAGE:
                let newMessage = {
                    id: this._state.dialogs.dialogsData[action.id - 1].messages.length + 1,
                    text: this._state.dialogs.newMessageValue,
                    from: 'Vsevolod'
                };
                
                this._state.dialogs.dialogsData[action.id - 1].messages.push(newMessage);
                this._state.dialogs.newMessageValue = '';
                this._callSubscriber(this._state);
                break;

            case MESSAGE_CHANGE:
                this._state.dialogs.newMessageValue = action.value;
                this._callSubscriber(this._state);
                break;

            default:
                console.log(`К сожалению, такого action (${action.type}) нет в store`);
        }
    }
}

export const addPostActionCreator = () => ({type: ADD_POST});
export const postChangeActionCreator = (value) => ({type: POST_CHANGE, value: value});

export const addMessageActionCreator = (id) => ({type: ADD_MESSAGE, id: id});
export const messageChangeActionCreator = (value) => ({type: MESSAGE_CHANGE, value: value});

export default store;