import {actions, followThunkCreator, unfollowThunkCreator} from './users-reducer'
import {usersAPI} from '../api/users-api'
import {AuthResultCodes, ResponseType} from '../api/api'

jest.mock('../api/users-api')

const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const userId = 1
const dispatch = jest.fn()
const result: ResponseType = {
    resultCode: AuthResultCodes.Success,
    messages: [],
    data: {}
}


usersAPIMock.followUser.mockReturnValue(Promise.resolve(result))
usersAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result))

beforeEach(() => {
    dispatch.mockClear()
})

test('follow thunk success', async () => {
    const thunk = followThunkCreator(userId)

    await thunk(dispatch)

    expect(dispatch).toBeCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1, actions.setIsFollowing(userId, true))
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.follow(userId))
    expect(dispatch).toHaveBeenNthCalledWith(3, actions.setIsFollowing(userId, false))
})

test('unfollow thunk success', async () => {
    const thunk = unfollowThunkCreator(userId)

    await thunk(dispatch)

    expect(dispatch).toBeCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1, actions.setIsFollowing(userId, true))
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.unfollow(userId))
    expect(dispatch).toHaveBeenNthCalledWith(3, actions.setIsFollowing(userId, false))
})