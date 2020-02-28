import {RESET_FORM} from './actions/actions'

const ADD_MESSAGE = 'dialogs/ADD_MESSAGE';

type MessageItemStateType = {
    id: number
    text: string
    from: string
}
type DialogsItemStateType = {
    id: number
    name: string
    messages: Array<MessageItemStateType>
}
const initialState = {
    dialogsData: [
        {
            id: 1,
            name: 'Ekaterina',
            messages: [
                {id: 1, text: 'Привет', from: 'Ekaterina'},
                {id: 2, text: 'Привет!', from: 'Vsevolod'},
                {id: 3, text: 'Как дела?', from: 'Ekaterina'}
            ] as Array<MessageItemStateType>
        },
        {
            id: 2,
            name: 'Leonid',
            messages: [
                {id: 1, text: 'Как дела?', from: 'Leonid'},
                {id: 2, text: 'Отлично!', from: 'Vsevolod'}
            ] as Array<MessageItemStateType>
        }
    ] as Array<DialogsItemStateType>
};

type InitialStateType = typeof initialState;

type ActionsTypes = AddMessageType | ResetMessage;

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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


type AddMessageType = {
    type: typeof ADD_MESSAGE
    id: number
    message: string
}
export const addMessage = (id: number, message: string): AddMessageType => ({type: ADD_MESSAGE, id, message});
type ResetMessage = {
    type: typeof RESET_FORM
}
export const resetMessage = (): ResetMessage => ({type: RESET_FORM});

export default dialogsReducer;