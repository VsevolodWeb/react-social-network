const SET_USER_DATA = 'SET-USER-DATA';

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            console.log(action)
            return {
                ...state,
                ...action.userData,
                isAuth: true
            };

        default:
            return state; 
    }
};

export const setUserData = (userData) => ({type: SET_USER_DATA, userData});

export default authReducer;