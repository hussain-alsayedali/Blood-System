import { createStore } from "redux";

const initialState = {
  user: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    // If the action type is "SET_USER", update the user property in the state
    case "SET_USER":
      // Return a new state object with the user property updated with the action payload
      return { ...state, user: action.payload };
    // Default case: return the current state if the action type is not recognized
    default:
      return state;
  }
}
const store = createStore(userReducer);

// Export the created store to be used in the application
export default store;
