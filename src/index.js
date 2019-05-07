import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import allReducers from "./reducers";
import rootSaga from "./sagas";
export const sagaMiddleware = createSagaMiddleware();
const store = createStore(allReducers, applyMiddleware(sagaMiddleware, logger));
// initializeSagas();
sagaMiddleware.run(rootSaga);
// store.dispatch({ type: "ADD_COURSE", name: "Science" });
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
// store.dispatch({ type: "ADD_COURSE" });
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
unsubscribe();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// function initializeSagas() {
//   console.log(allSagas);
//   allSagas.map(saga => {
//     console.log("running saga");
//     sagaMiddleware.run(saga);
//   });
// }
// export const saga = sagaMiddleware;
