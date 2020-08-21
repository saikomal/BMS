export const allCategoriesReducer = (state = [], action) => {
  if (action.type == "ALL_CATEGORIES") {
    return action.payload;
  }
  return state;
};
