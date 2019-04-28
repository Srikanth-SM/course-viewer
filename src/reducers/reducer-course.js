import courses from "./reducer-courseList";
import { ADD_COURSE, RECEIVED_COURSES } from "../actions";
const initialState = [
  {
    name: "Mathematics"
  },
  {
    name: "Science"
  },
  {
    name: "Zoology"
  }
];

export default function(state = initialState, action) {
  // console.log(state, action);
  switch (action.type) {
    case ADD_COURSE:
      return [...state, { ...action.course }];
    case RECEIVED_COURSES:
      return [...action.courses];
    case "hai":
    default:
      return state;
  }
}
