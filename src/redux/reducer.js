const initialState = {
  user_id: null,
  username: '',
  email: '',
  authenticated: false
}

const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS'

export function updateUserDetails(obj) {
  return {
    type: UPDATE_USER_DETAILS,
    payload: obj
  }
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case UPDATE_USER_DETAILS:
      const { user_id, username, email, authenticated } = payload
      return {
        ...state, user_id, username, email, authenticated
      }
    default:
      return state
  }

}