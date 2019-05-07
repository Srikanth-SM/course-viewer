import { put, takeLatest } from "redux-saga/effects";
import { showError, fetchCourses, receivedCourse } from "../actions";
import axios from "axios";

export function* updateCourseEvent(action) {
  try {
    const { course } = action;
    const res = yield axios.put("http://localhost:3001/courses/" + course.id, {
      ...course
    });

    if (res.status === 200) {
      yield put(receivedCourse(course));
      yield put(fetchCourses());
    } else {
      yield put(showError(res.statusText));
    }
  } catch (err) {
    console.log("error in update", err);
  }
}
export function* updateCourseSaga() {
  yield takeLatest("UPDATE_COURSE", updateCourseEvent);
}
