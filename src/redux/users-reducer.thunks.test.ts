import {followThunkCreator} from './users-reducer'
import {usersAPI} from '../api/users-api'
import {AuthResultCodes, ResponseType} from '../api/api'

jest.mock('../api/users-api')

const usersAPIMock = usersAPI
const result: ResponseType = {
    resultCode: AuthResultCodes.Success,
    messages: [],
    data: {}
}

// @ts-ignore
usersAPIMock.followUser.mockReturnValue(result)

test('', async () => {
    const thunk = followThunkCreator(1)

    const dispatch = jest.fn()

    await thunk(dispatch)

    expect(dispatch).toBeCalledTimes(3)
})