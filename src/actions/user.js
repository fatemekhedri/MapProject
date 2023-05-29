export const updateUser = (user) => {
  return {
    type: "UPDATE_USER",
    payload: user,
  };
};
export const clearUser = () => {
  return {
    type: "CLEAR_USER",
  };
};
