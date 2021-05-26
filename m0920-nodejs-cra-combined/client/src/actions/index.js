import Axios from 'axios'

import { FETCH_USER } from './types';

export const fetchUser = () => async(dispatch) => {
    const response = await Axios.get('/api/auth/current_user')
    if(response) dispatch({ type: FETCH_USER, payload: response.data })
}

// export const fetchUser = () => {
//     return function (dispatch) {
//         axios.get(...)
//     }
// }
