import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { FETCH_AUTHORS, receivedAuthors } from "../actions";

export function* fetchAuthorsEvent(action) {
  console.log("fetch courses", action);
  const authors = yield axios.get("http://localhost:3001/authors");
  console.log(authors);
  yield put(receivedAuthors(authors.data));
}

export function* fetchAuthorsSaga() {
  console.log("fetch courses saga");
  return yield takeLatest(FETCH_AUTHORS, fetchAuthorsEvent);
}
