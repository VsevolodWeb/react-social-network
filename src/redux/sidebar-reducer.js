const initialState = {
    friends: [
        {id: 1, name: 'Vladimir'},
        {id: 2, name: 'Jana'},
        {id: 3, name: 'Elena'}
    ]
}

const sidebarReducer = (state = initialState, action) => {
    return state;
};

export default sidebarReducer;