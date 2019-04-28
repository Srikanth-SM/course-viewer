import { combineReducers } from "redux";
import AuthorListReducer from "./reducer-courseList";
import CourseListReduceer from "./reducer-course";
import ErrorReducer from "./reducer-error";
import RedirectReducer from "./reducer-redirect";
import CourseReducer from "./reducer-getSingleCourse";

// console.log(CourseListReducer);
const allReducers = combineReducers({
  authors: AuthorListReducer,
  courses: CourseListReduceer,
  error: ErrorReducer,
  redirectPath: RedirectReducer,
  course: CourseReducer
});
export default allReducers;
