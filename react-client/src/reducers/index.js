import { combineReducers } from "redux";
import { reducer } from "redux-form";
import { selectedAdminTabReducer } from "./admin";
import { allCategoriesReducer } from "./categories";
export default combineReducers({
  form: reducer,
  activeAdminTab: selectedAdminTabReducer,
  allCategories: allCategoriesReducer,
});
