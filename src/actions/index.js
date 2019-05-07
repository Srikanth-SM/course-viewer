import axios from "axios";
import { Redirect } from "react-router";

export const ADD_COURSE = "ADD_COURSE";
export const FETCH_COURSES = "FETCH_COURSES";
export const RECEIVED_COURSES = "RECEIVED_COURSES";
export const RECEIVED_COURSE = "RECEIVED_COURSE";
export const RECEIVED_AUTHORS = "RECEIVED_AUTHORS";
export const FETCH_AUTHORS = "FETCH_AUTHORS";
export const RE_DIRECT = "RE_DIRECT";

export const addCourse = (course = {}) => {
  return {
    type: ADD_COURSE,
    course: course
  };
};

export const receivedCourses = (courses = []) => {
  console.log("received courses");
  return {
    type: RECEIVED_COURSES,
    courses: courses
  };
};

export const receivedCourse = (course = {}) => {
  return {
    type: RECEIVED_COURSE,
    course: course
  };
};

export const receivedAuthors = (authors = []) => {
  return {
    type: RECEIVED_AUTHORS,
    authors: authors
  };
};

export const fetchCourses = () => {
  return {
    type: FETCH_COURSES
  };
};

export const fetchCourse = id => {
  return dispatch => {
    axios
      .get("http://localhost:3001/courses/" + id)
      .then(res => {
        dispatch(receivedCourse(res.data));
      })
      .catch(err => {});
  };
};

export const updateCourse = course => {
  return {
    type: "UPDATE_COURSE",
    course: course
  };
};

// export const updateCourse = (course, cb) => {
//   return dispatch => {
//     axios
//       .put("http://localhost:3001/courses/" + course.id, { ...course })
//       .then(res => {
//         if (res.status == 200) {
//           dispatch(receivedCourse(course));
//           dispatch(redirect("/courses"));
//           return cb();
//         } else if (res.status == 404) {
//           dispatch(showError("Course Not Found"));
//         } else {
//           dispatch(showError("Course not updated"));
//         }
//       })
//       .catch(err => {
//         if (err && !err.response) {
//           return dispatch(showError("Server not running"));
//         }
//         dispatch(showError(err.response.data));
//         console.log(
//           "error in adding course",
//           JSON.stringify(err.response, null, 4)
//         );
//       });
//   };
// };

export const fetchAuthors = () => {
  return {
    type: FETCH_AUTHORS
  };
};
// export const fetchAuthors = () => {
//   return function(dispatch) {
//     axios
//       .get("http://localhost:3001/authors")
//       .then(res => {
//         dispatch(receivedAuthors(res.data));
//       })
//       .catch(err => {});
//   };
// };

export const showError = text => {
  return {
    type: "ERROR",
    error: text
  };
};

export const redirect = (path = null) => {
  return {
    type: RE_DIRECT,
    redirectPath: path
  };
};

export const postCourse = (course, cb) => {
  return dispatch => {
    axios
      .post("http://localhost:3001/courses/", { ...course })
      .then(res => {
        if (res.statusText == "Created" && res.status == 201) {
          dispatch(addCourse(course));
          dispatch(redirect("/courses"));
          return cb();
        } else {
          dispatch(showError(res.statusText));
        }
      })
      .catch(err => {
        if (err && !err.response) {
          return dispatch(showError("Server not running"));
        }
        dispatch(showError(err.response.data));
        console.log(
          "error in adding course",
          JSON.stringify(err.response, null, 4)
        );
      });
  };
};

export const deleteCourse = course => {
  return {
    type: "DELETE_COURSE",
    course: course
  };
};
// export const deleteCourse = (course, cb) => {
//   return dispatch => {
//     axios
//       .delete("http://localhost:3001/courses/" + course.id)
//       .then(res => {
//         if (res.statusText == "OK" && res.status == 200) {
//           // dispatch(delete(course));
//           dispatch(redirect("/courses"));
//           return cb();
//         } else {
//           dispatch(showError(res.statusText));
//         }
//       })
//       .catch(err => {
//         if (err) {
//           return dispatch(showError(err.statusText));
//         }
//         dispatch(showError(err.response.data));
//         console.log(
//           "error in adding course",
//           JSON.stringify(err.response, null, 4)
//         );
//       });
//   };
// };
