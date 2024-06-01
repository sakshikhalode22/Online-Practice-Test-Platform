import { BUTTONCLICKED, GOOGLELOGIN, USERLOGEDIN } from "../Action/ActionType"
const session=sessionStorage.getItem("user-login")? JSON.parse(sessionStorage.getItem("user-login")):false;

const initialState={
    isLoggedIn:session,
    buttonClicked:false,
    googleLogin:false
}
const UserReducers=(state=initialState,action)=>{
    switch(action.type){
        case USERLOGEDIN:
            return{
                ...state,
                isLoggedIn:action.payload
            }
        case BUTTONCLICKED:
            return{
                ...state,
                buttonClicked:action.payload
            }
        case GOOGLELOGIN:
            return{
                ...state,
                googleLogin:action.payload
            }
        default:
            return state
    }
}

export default UserReducers