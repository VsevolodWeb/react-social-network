const ADD_MESSAGE = 'ADD-MESSAGE';
const MESSAGE_CHANGE = 'MESSAGE-CHANGE';

const dialogsReducer = (state, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: state.dialogsData[action.id - 1].messages.length + 1,
                text: state.newMessageValue,
                from: 'Vsevolod'
            };
            
            state.dialogsData[action.id - 1].messages.push(newMessage);
            state.newMessageValue = '';
            break;

        case MESSAGE_CHANGE:
            state.newMessageValue = action.value;
            break;

        default:
            break;
    }

    return state;
};

export const addMessageActionCreator = (id) => ({type: ADD_MESSAGE, id: id});
export const messageChangeActionCreator = (value) => ({type: MESSAGE_CHANGE, value: value});

export default dialogsReducer;