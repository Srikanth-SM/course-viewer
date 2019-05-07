import { put, takeLatest } from "redux-saga/effects";
import { showError, fetchCourses } from "../actions";
import axios from "axios";

export function* deleteCourseEvent(action) {
  try {
    const { course } = action;
    const res = yield axios.delete(
      "http://localhost:3001/courses/" + course.id
    );

    if (res.statusText === "OK" && res.status === 200) {
      yield put(fetchCourses());
    } else {
      yield put(showError(res.statusText));
    }
  } catch (err) {
    console.log("error in delete", err);
  }
}
export function* deleteCourseSaga() {
  yield takeLatest("DELETE_COURSE", deleteCourseEvent);
}
