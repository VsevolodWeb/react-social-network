import profileReducer, { actions, initialState } from './profile-reducer';

const messagePost = 'text from test';
const newStateAfterAddPost = profileReducer(initialState, actions.addPost(messagePost));

const getPostDataLength = state => state.postsData.length;


it('the number of posts should increase', () => {
    expect(getPostDataLength(newStateAfterAddPost)).toBe(getPostDataLength(initialState) + 1);
});

it('text message should match with added post', () => {
    expect(newStateAfterAddPost.postsData[getPostDataLength(newStateAfterAddPost) - 1].text).toBe(messagePost);
});