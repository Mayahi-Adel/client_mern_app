import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import postReducer from "./post.reducer";
import errorReducer from "./error.reducer";
import allPostsReducer from "./allPosts.reducer";
import trendingReducer from "./Trending.reducer";

export default combineReducers({
  user: userReducer,
  users: usersReducer,
  posts: postReducer,
  errors: errorReducer,
  allPosts: allPostsReducer,
  trends: trendingReducer,
});
