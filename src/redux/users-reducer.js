const SHOW_MORE = 'SHOW-MORE';
const FOLLOW = 'FOLLOW';

const initialState = {
    users: [
        {
            id: '1',
            name: 'Volodya',
            location: 'Russia',
            status: 'Ya rodilsya!',
            isFollow: 'false'
        },
        {
            id: '2',
            name: 'Kseniya',
            location: 'USA',
            status: 'OMG!',
            isFollow: 'true'
        }
    ]
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MORE: {
            return state;
        }

        case FOLLOW: {
            return state;
        }

        default:
            return state; 
    }
};

export const showMoreActionCreator = (id) => ({type: SHOW_MORE});
export const followActionCreator = (id) => ({type: SHOW_MORE});

export default usersReducer;