import { USERINFO, GOOGLELOGIN, USERLOGEDIN } from "../Action/ActionType"
const session=sessionStorage.getItem("user-login")? JSON.parse(sessionStorage.getItem("user-login")):false;
console.log(session)
const initialState={
    isLoggedIn:session,
    userLoginInfo:session,
    googleLogin:false
}
const UserReducers=(state=initialState,action)=>{
    switch(action.type){
        case USERLOGEDIN:
            console.log(action.payload)
            return{
                ...state,
                isLoggedIn:action.payload
            }
        case GOOGLELOGIN:
            return{
                ...state,
                googleLogin:action.payload
            }
        case USERINFO:
            return{
                ...state,
                userLoginInfo:action.payload
            }
        default:
            return state
    }
}

export default UserReducers