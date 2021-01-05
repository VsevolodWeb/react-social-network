import {RESET_FORM} from './actions/actions'
import {InferActionsTypes} from './redux-store'

export type MessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const initialState = {
    dialogsData: [
        {
            id: 1,
            name: 'Ekaterina',
            messages: [
                {message: 'Привет', userName: 'Ekaterina', photo: ''},
                {message: 'Привет!', userName: 'Vsevolod', photo: ''},
                {message: 'Как дела?', userName: 'Ekaterina', photo: ''},
            ] as MessageType[]
        },
        {
            id: 2,
            name: 'Leonid',
            messages: [
                {message: 'Приветики', userName: 'Leonid', photo: ''},
                {message: 'Привет!', userName: 'Vsevolod', photo: ''},
                {message: 'Как делишки??', userName: 'Leonid', photo: ''},
            ] as MessageType[]
        }
    ]
}

type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'actions/ADD_MESSAGE': {
            let stateCopy = JSON.parse(JSON.stringify(state))
            let newMessage = {
                text: action.message,
                userName: 'Vsevolod'
            }

            stateCopy.dialogsData[action.id - 1].messages.push(newMessage)

            return stateCopy
        }

        default:
            return state
    }
}


export const actions = {
    addMessage: (id: number, message: string) => ({type: 'actions/ADD_MESSAGE', id, message} as const),
    resetMessage: () => ({type: RESET_FORM} as const)
}


export default dialogsReducer