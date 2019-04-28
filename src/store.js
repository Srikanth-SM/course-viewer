import { createStore } from "redux";
import CourseViewerApp from "./reducer";
import { ADD_COURSE, addCourse } from "./actions";
import {} from "./actions";

const store = createStore(CourseViewerApp);

console.log(store.getState());
const unsubscribe = store.subscribe(() => console.log(store.getState()));
store.dispatch(addCourse({ name: "Science" }));
unsubscribe();
