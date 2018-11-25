const initialState = {
  baseInfo: null,
  authInfo: null
};

const userinfo = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_BASEINFO":
      return {
        ...state,
        baseInfo: action.data
      };
    case "UPDATE_AUTHINFO":
      return {
        ...state,
        authInfo: action.data
      };
    case "DELETE_USERINFO":
      return {
        baseInfo: null,
        authInfo: null
      }
    default:
      return state;
  }
};

export default userinfo;
