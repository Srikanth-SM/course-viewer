export default function(state = null, action) {
  if (action.type == "RE_DIRECT") {
    return action.redirectPath;
  }
  return state;
}
