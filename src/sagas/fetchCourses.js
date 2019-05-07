import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { FETCH_COURSES, RECEIVED_COURSES, receivedCourses } from "../actions";

export function* fetchCoursesEvent(action) {
  console.log("fetch courses", action);
  const courses = yield axios.get("http://localhost:3001/courses");
  yield put(receivedCourses(courses.data));
}

export function* fetchCoursesSaga() {
  console.log("fetch courses saga");
  return yield takeLatest(FETCH_COURSES, fetchCoursesEvent);
}
