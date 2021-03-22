import {
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure
} from './actions'
import { ApiClient } from '../../ApiClient'

let client = new ApiClient()

export const fetchUsers = () => {
    return (dispatch) => {
        dispatch(fetchUsersRequest())
        client.get('users')
            .then(response => {
                const users = response.data.data
                dispatch(fetchUsersSuccess(users))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchUsersFailure(errorMsg))
            })
    }
}
