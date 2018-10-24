export function reducer(state, action) {
  let newState = { ...state };

  switch (action.type) {
    case "CHANGE_DIFFICULTY":
      newState.difficulty = action.payload.difficulty;
      return newState;
    default:
      return state;
  }
}
