import {RESET_FORM} from './actions/actions'
import {InferActionsTypes} from "./redux-store";


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

type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "actions/ADD_MESSAGE": {
            let stateCopy = Object.assign({}, state);
            let newMessage = {
                id: stateCopy.dialogsData[action.id - 1].messages.length + 1,
                text: action.message,
                from: 'Vsevolod'
            }
            
            stateCopy.dialogsData[action.id - 1].messages.push(newMessage)
            
            return stateCopy
        }

        default:
            return state
    }
}


export const actions = {
    addMessage: (id: number, message: string) => ({type: "actions/ADD_MESSAGE", id, message} as const),
    resetMessage: () => ({type: RESET_FORM} as const)
}


export default dialogsReducer