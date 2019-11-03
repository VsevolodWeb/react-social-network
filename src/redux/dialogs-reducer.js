const ADD_MESSAGE = 'ADD-MESSAGE';

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
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let stateCopy = Object.assign({}, state);
            let newMessage = {
                id: stateCopy.dialogsData[action.id - 1].messages.length + 1,
                text: action.message,
                from: 'Vsevolod'
            };
            
            stateCopy.dialogsData[action.id - 1].messages.push(newMessage);
            
            return stateCopy;
        }

        default:
            return state; 
    }
};

export const addMessage = (id, message) => ({type: ADD_MESSAGE, id, message});

export default dialogsReducer;