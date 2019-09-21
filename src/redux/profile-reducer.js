const ADD_POST = 'ADD-POST';
const POST_CHANGE = 'POST-CHANGE';

const initialState = {
    postsData: [
        {id: 1, text: 'Hello', name: 'Vsevolod', likeCount: 1},
        {id: 2, text: 'Hello', name: 'Ekaterina', likeCount: 3}
    ],
    newPostValue: ''
}

const profileReducer = (state = initialState, action) => {  
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                postsData: [...state.postsData,
                    {
                        id: '' + state.postsData.length + 1,
                        text: state.newPostValue,
                        name: 'Vsevolod',
                        likeCount: '0'
                    }
                ],
                newPostValue: ''
            }
        }

        case POST_CHANGE:
            return {
                ...state,
                newPostValue: action.value
            }

        default:
            return state;
    }
};

export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostActionCreator = (value) => ({type: POST_CHANGE, value: value});

export default profileReducer;