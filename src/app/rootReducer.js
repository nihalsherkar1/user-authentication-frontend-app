import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";

export default combineReducers({
  login: loginReducer,
});
