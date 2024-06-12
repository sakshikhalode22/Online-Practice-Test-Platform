import {
  USERINFO,
  GOOGLELOGIN,
  USERLOGEDIN,
  USEREXAM,
} from "../Action/ActionType";
const session = sessionStorage.getItem("user-login")
  ? JSON.parse(sessionStorage.getItem("user-login"))
  : false;

const initialState = {
  isLoggedIn: session,
  userLoginInfo: session,
  googleLogin: false,
  userExam: null,
};
const UserReducers = (state = initialState, action) => {
  switch (action.type) {
    case USERLOGEDIN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case GOOGLELOGIN:
      return {
        ...state,
        googleLogin: action.payload,
      };
    case USERINFO:
      return {
        ...state,
        userLoginInfo: action.payload,
      };
    case USEREXAM:
      let temp = action.payload;
      return {
        ...state,
        userExam: temp,
      };
    default:
      return state;
  }
};

export default UserReducers;
