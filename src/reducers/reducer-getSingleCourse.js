import { RECEIVED_COURSE } from "../actions";
export default function(course = null, action) {
  if (action.type === RECEIVED_COURSE) {
    return action.course;
  }
  return course;
}
