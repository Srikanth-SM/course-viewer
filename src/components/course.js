import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCourses,
  fetchAuthors,
  deleteCourse,
  showError
} from "../actions";
class Courses extends React.Component {
  state = {
    name: "",
    authorId: "",
    catagory: ""
  };
  componentDidMount() {
    this.props.fetchCourses();
    this.props.fetchAuthors();
  }
  addCourse = course => {
    // const courses = this.state.courses.slice();
    // courses.push({ name: course });
    // this.setState({ courses });
    // this.props.addCourse(course);
    // this.props.fetchCourses();
  };
  handleGetCourse = (event, course = null) => {
    // event.preventDefault();
    this.setState({ course });
  };

  handleDeleteCourse = (event, course = null) => {
    this.props.deleteCourse(course);
  };

  render() {
    const courses = this.props.courses;
    const authors = this.props.authors;
    let htmlCourses = courses.map((course, id) => {
      return (
        <tr key={id}>
          <th scope="row">watch</th>
          <td>
            <Link
              to={"/course/" + course.slug + ""}
              onClick={event => this.handleGetCourse(event, course)}
              course={() => {
                "srikanth";
              }}
            >
              {course.title}
            </Link>
          </td>
          <td>{authors[course.authorId]}</td>
          <td>{course.category}</td>
          <td>
            <button onClick={event => this.handleDeleteCourse(event, course)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <button onClick={this.addCourse}>
          <Link to="/course">Add Course</Link>
        </button>
        {courses && courses.length && (
          <div>
            <div>
              <h3>Courses</h3>
            </div>
            <div>
              <table className="table App">
                <tbody>
                  <tr>
                    <td />
                    <td>Title</td>
                    <td>Author</td>
                    <td>Category</td>
                  </tr>
                  {htmlCourses}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// it maps the redux store(whole state object) to the props of the component
// As this component needs only the list of courses we return only the courses in the state object.
function mapStateToProps(state) {
  const { courses, authors, redirectPath } = { ...state };
  let set = {};
  authors.map(author => {
    return (set[author.id] = author.name);
  });
  return { courses, authors: set, redirectPath };
}

export default connect(
  mapStateToProps,
  { fetchCourses, fetchAuthors, deleteCourse, showError }
)(Courses);
