const ADD_POST = 'ADD-POST';
const POST_CHANGE = 'POST-CHANGE';
const SET_USER_PROFILE = 'SET-USER-PROFILE';

const initialState = {
    postsData: [
        {id: 1, text: 'Hello', name: 'Vsevolod', likeCount: 1},
        {id: 2, text: 'Hello', name: 'Ekaterina', likeCount: 3}
    ],
    newPostValue: '',
    profile: {
        fullName: "Vsevolod Ivanov",
        aboutMe: "I am man"
    },
    userProfile: null
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

        case SET_USER_PROFILE:
            return {...state, userProfile: action.userProfile}

        default:
            return state;
    }
};

export const addPost= () => ({type: ADD_POST});
export const updateNewPost = (value) => ({type: POST_CHANGE, value});
export const setUserProfile = (userProfile) => ({type: SET_USER_PROFILE, userProfile});

export default profileReducer;