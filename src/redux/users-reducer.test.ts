import usersReducer, {actions, InitialStateType} from "./users-reducer"

let state: InitialStateType

beforeEach(() => {
    state = {
        list: [
            {
                id: 0,
                name: 'Test User 0',
                followed: false,
                photos: {small: "", large: ""},
                status: "My status 0"
            },
            {
                id: 1,
                name: 'Test User 1',
                followed: false,
                photos: {small: "", large: ""},
                status: "My status 1"
            },
            {
                id: 2,
                name: 'Test User 2',
                followed: true,
                photos: {small: "", large: ""},
                status: "My status 2"
            },
            {
                id: 3,
                name: 'Test User 3',
                followed: true,
                photos: {small: "", large: ""},
                status: "My status 3"
            }
        ],
        pageSize: 20,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        isFollowing: []
    }
})

test("follow user", () => {
    const newState = usersReducer(state, actions.follow(1))

    expect(newState.list[0].followed).toBeFalsy()
    expect(newState.list[1].followed).toBeTruthy()
})

test("unfollow user", () => {
    const newState = usersReducer(state, actions.unfollow(3))

    expect(newState.list[2].followed).toBeTruthy()
    expect(newState.list[3].followed).toBeFalsy()
})