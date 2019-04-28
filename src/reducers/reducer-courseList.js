import { RECEIVED_AUTHORS } from "../actions";
export default function(authors = [], action) {
  // console.log(authors, action);
  switch (action.type) {
    case RECEIVED_AUTHORS:
      return [...authors, ...action.authors];
    default:
      return authors;
  }
}
