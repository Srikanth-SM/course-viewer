import React from "react";
import { connect } from "react-redux";
import { addCourse, fetchCourse, updateCourse } from "../actions";

class FormEditCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props.course, toCourses: false };
  }
  onHandleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    this.props.updateCourse(this.state);
    this.props.history.push("/courses");
  };
  onHandleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    console.log("render");
    const authors = this.props.authors;
    const course = this.props.course;
    const authorOptions = Object.keys(authors).map(key => {
      return <option value={key}>{authors[key]}</option>;
    });
    return (
      <div>
        <form action="PUT" onSubmit={event => this.onHandleSubmit(event)}>
          <div>
            <label>Title</label>
          </div>
          <input
            type="text"
            name="title"
            id=""
            onChange={this.onHandleChange}
            value={this.state.title}
          />
          <div>
            <label>Author</label>
          </div>
          <select
            name="authorId"
            value={this.state.authorId || authors[course["authorId"]]}
            onChange={this.onHandleChange}
            id=""
          >
            {authorOptions}
          </select>
          <div>
            <label>category</label>
          </div>
          <input
            type="text"
            name="category"
            onChange={this.onHandleChange}
            id=""
            value={this.state.category || course["category"]}
          />
          <div>
            <br />
            <button type="submit" value="save">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state, props) {
  const { authors, courses, redirectPath } = { ...state };
  let set = {};
  authors.map(author => {
    return (set[author.id] = author.name);
  });
  let course = courses.filter(course => {
    return course.slug === props.match.params.slug;
  })[0];

  return {
    authors: set,
    course: course,
    courses: state.courses,
    redirectPath: redirectPath
  };
}

export default connect(
  mapStateToProps,
  { fetchCourse, updateCourse, addCourse }
)(FormEditCourse);
