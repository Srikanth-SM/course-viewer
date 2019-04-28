import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { addCourse, fetchCourses, fetchAuthors, fetchCourse } from "./actions";
import About from "./components/about";
import Courses from "./components/course";
import Home from "./components/home";
import PageNotFound from "./components/pageNotFound";
import FormCourseComponent from "./components/formCourseComponent";
import FormEditCourseComponent from "./components/formEditCourseComponent";

class App extends React.Component {
  componentWillMount() {}
  componentDidMount() {
    this.props.fetchCourses();
    this.props.fetchAuthors();
  }
  render() {
    const style = {
      color: "red"
    };
    return (
      <div className="App">
        <Router>
          <NavLink exact activeStyle={style} to="/">
            Home
          </NavLink>
          {" | "}
          <NavLink exact activeStyle={style} to="/courses">
            Courses
          </NavLink>
          {" | "}
          <NavLink exact activeStyle={style} to="/about">
            About
          </NavLink>
          <NavLink to="*" />

          <Switch history={this.props.history}>
            <Route path="/" exact component={Home} />
            <Route path="/courses" exact component={Courses} />
            <Route path="/about" exact component={About} />
            <Route path="/course" exact component={FormCourseComponent} />
            <Route
              path="/course/:slug"
              exact
              render={props => <FormEditCourseComponent {...props} />}
            />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

// it maps the redux store(whole state object) to the props of the component
// As this component needs only the list of courses we return only the courses in the state object.
function mapStateToProps(state) {
  const { courses, authors } = { ...state };
  let set = {};
  authors.map(author => {
    set[author.id] = author.name;
  });
  return { courses, authors: set };
}

function mapDispatchToProps() {
  return {
    fetchCourses,
    fetchAuthors
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(App);
