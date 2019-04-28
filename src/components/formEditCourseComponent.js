import React from "react";
import { connect } from "react-redux";
import { ADD_COURSE, redirect, fetchCourse, updateCourse } from "../actions";

class FormEditCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props.course, toCourses: false };
  }
  onHandleSubmit = event => {
    event.preventDefault();
    this.props.updateCourse(this.state, () => {
      console.log("after");
      this.setState({ authorId: "", name: "", category: "" });
      console.log(this.props);
      if (this.props.redirectPath) {
        this.props.history.push("/courses");
        this.setState({ toCourses: true });
        // console.log("if", this.state);
        redirect(null);
      }
      console.log(this.props);
    });
  };
  onHandleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    console.log("render");
    const authors = this.props.authors;
    const course = this.props.course;

    console.log(authors, course, authors[course["authorId"]]);
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
  console.log("*****", props.match.params);
  console.log({ ...state });
  const { authors, courses, redirectPath } = { ...state };
  let set = {};
  authors.map(author => {
    set[author.id] = author.name;
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
  { fetchCourse, updateCourse }
)(FormEditCourse);
