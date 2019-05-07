import { put, takeLatest } from "redux-saga/effects";
import { showError, fetchCourses } from "../actions";
import axios from "axios";
import {
  addCourse as courseAdd,
  ADD_COURSE,
  redirect,
  RE_DIRECT
} from "../actions";

const redirectUrl = "/courses";
export function* addCourseEvent(args) {
  try {
    const { course } = args;

    const res = yield axios.post("http://localhost:3001/courses/", {
      ...course
    });
    if (res.statusText == "Created" && res.status == 201) {
      yield put(fetchCourses());
    } else {
      yield put(showError(res.statusText));
    }
    //   console.log(resp);
  } catch (err) {
    console.log("error", err);
  }
}

export function* addCourseSaga() {
  yield takeLatest("ADD_COURSE", addCourseEvent);
}
