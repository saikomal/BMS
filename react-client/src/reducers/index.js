import { combineReducers } from "redux";
import { reducer } from "redux-form";
import { selectedAdminTabReducer } from "./admin";

export default combineReducers({
  form: reducer,
  activeAdminTab: selectedAdminTabReducer,
});
