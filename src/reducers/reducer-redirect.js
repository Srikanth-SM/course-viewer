export default function(state = null, action) {
  console.log(action);
  if (action.type == "RE_DIRECT") {
    return action.redirectPath;
  }
  return state;
}
