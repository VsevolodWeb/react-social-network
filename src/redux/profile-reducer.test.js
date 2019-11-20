import profileReducer, { addPost, initialState } from "./profile-reducer";


it('the number of posts should increase', () => {
    const messagePost = "text from test";
    const action = addPost(messagePost);
    const newState = profileReducer(initialState, action);
    const getPostDataLength = state => state.postsData.length;

    expect(getPostDataLength(newState)).toBe(getPostDataLength(initialState) + 1);
    expect(newState.postsData[getPostDataLength(newState) - 1].text).toBe(messagePost);
});
  