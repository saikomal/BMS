export const selectedAdminTabReducer = (activeAdminTab = "company", action) => {
  if (action.type === "SELECTED_ADMIN_TAB") {
    return action.payload;
  }
  return activeAdminTab;
};
