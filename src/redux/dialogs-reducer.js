const ADD_MESSAGE = 'ADD-MESSAGE';
const MESSAGE_CHANGE = 'MESSAGE-CHANGE';

const initialState = {
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
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let stateCopy = Object.assign({}, state);
            let newMessage = {
                id: stateCopy.dialogsData[action.id - 1].messages.length + 1,
                text: stateCopy.newMessageValue,
                from: 'Vsevolod'
            };
            
            stateCopy.dialogsData[action.id - 1].messages.push(newMessage);
            stateCopy.newMessageValue = '';
            
            return stateCopy;
        }
        case MESSAGE_CHANGE:
            return {
                ...state,
                newMessageValue: action.value
            }

        default:
            return state; 
    }
};

export const addMessageActionCreator = (id) => ({type: ADD_MESSAGE, id: id});
export const messageChangeActionCreator = (value) => ({type: MESSAGE_CHANGE, value: value});

export default dialogsReducer;