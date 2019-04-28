import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { createBrowserHistory } from "history";
import { ADD_COURSE, postCourse, redirect } from "../actions";
class FormCourseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      authorId: "",
      category: "",
      toCourses: false
    };
    this.history = createBrowserHistory();
  }

  // componentWillUpdate() {

  //   return true;
  // }

  onHandleSubmit = event => {
    event.preventDefault();
    this.props.postCourse(this.state, () => {
      this.setState({ authorId: "", name: "", category: "" });
      if (this.props.redirectPath) {
        this.props.history.push(this.props.redirectPath);
        this.setState({ toCourses: true });
        redirect(null);
      }
    });
    // this.history.push("/courses");
  };
  onHandleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    if (this.state.toCourses === true) {
      return <Redirect to="/courses" />;
    }
    return (
      <div>
        {this.props.error}
        <h3>Add Courses</h3>
        <form action="POST" onSubmit={this.onHandleSubmit}>
          <div>
            <div>
              <label>Title</label>
            </div>
            <div>
              <input
                name="title"
                type="text"
                onChange={this.onHandleChange}
                value={this.state.name}
              />
            </div>
          </div>
          <div>
            <div>
              <label>AuthorId</label>
            </div>
            <div>
              <input
                name="authorId"
                type="text"
                onChange={this.onHandleChange}
                value={this.state.name}
              />
            </div>
          </div>
          <div>
            <div>
              <label>Category</label>
            </div>
            <div>
              <input
                name="category"
                type="text"
                onChange={this.onHandleChange}
                value={this.state.name}
              />
            </div>
          </div>
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
function mapStateToProps(state) {
  return {
    error: state.error,
    redirectPath: state.redirectPath
  };
}
// export default FormCourseComponent;
export default connect(
  mapStateToProps,
  { postCourse, redirect }
)(FormCourseComponent);
