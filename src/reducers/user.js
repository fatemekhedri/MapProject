const initialState = "";
const user = (state = initialState, action) => {
  const { type, payload = "" } = action;
  switch (type) {
    case "UPDATE_USER":
      return payload;
    case "CLEAR_USER":
      return initialState;

    default:
      return state;
  }
};
export default user;
