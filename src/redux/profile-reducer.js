const ADD_POST = 'ADD-POST';
const POST_CHANGE = 'POST-CHANGE';

const initialState = {
    postsData: [
        {id: '1', text: 'Hello', name: 'Vsevolod', likeCount: '1'},
        {id: '2', text: 'Hello', name: 'Ekaterina', likeCount: '3'}
    ],
    newPostValue: ''
}

const profileReducer = (state = initialState, action) => {    
    switch (action.type) {
        case ADD_POST: {
            let stateCopy = {...state, postsData: [...state.postsData]};
            let newPost = {
                id: '' + state.postsData.length + 1,
                text: state.newPostValue,
                name: 'Vsevolod',
                likeCount: '0'
            };
        
            stateCopy.postsData.push(newPost);
            stateCopy.newPostValue = '';

            return stateCopy;
        }

        case POST_CHANGE: {
            let stateCopy = {...state};
            stateCopy.newPostValue = action.value;
            
            return stateCopy;
        }

        default:
            return state;
    }
};

export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostActionCreator = (value) => ({type: POST_CHANGE, value: value});

export default profileReducer;