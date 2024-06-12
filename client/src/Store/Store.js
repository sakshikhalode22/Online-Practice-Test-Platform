import {
  legacy_createStore as createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";

import UserReducers from "../Reducer/UserReducer";

const rootReducer = combineReducers({
  userReducers: UserReducers,
});

const configureStore = () => {
  return createStore(rootReducer, compose(applyMiddleware(thunk)));
};

export default configureStore;
