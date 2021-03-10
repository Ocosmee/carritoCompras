import { AUTHENTICATE, LOGIN, LOGOUT, SET_DID_TRY_AL, SIGNUP } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  didTryLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
        return {
            token: action.token,
            userId: action.userId,
            didTryLogin : true
        }
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryLogin: true
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryLogin: true
      };
    // case SIGNUP:
    //     return {
    //         token: action.token,
    //         userId: action.userId
    //     }
    default:
      return state;
  }
};
