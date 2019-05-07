import { all } from "redux-saga/effects";
import { helloSaga } from "./sagas";
import { fetchCoursesSaga } from "./fetchCourses";
import { addCourseSaga } from "./addCourse";
import { deleteCourseSaga } from "./deleteCourse";
import { updateCourseSaga } from "./updateCourse";
import { fetchAuthorsSaga } from "./fetchAuthors";

export default function* rootSaga() {
  yield all([
    helloSaga(),
    fetchCoursesSaga(),
    addCourseSaga(),
    deleteCourseSaga(),
    updateCourseSaga(),
    fetchAuthorsSaga()
  ]);
}
// var courses = fetchCoursesSaga();
// console.log(courses.next());
