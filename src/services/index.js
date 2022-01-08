import api from "./api";
import {
  getUserById,
  uploadFile,
  updateBiography,
  getAllUsers,
  follow_user,
  unfollow_user,
} from "./users";

import {
  getAllPosts,
  add_post,
  like_post,
  unlike_post,
  update_post,
  delete_post,
  add_comment,
  edit_comment,
  delete_comment,
} from "./posts";

const signin = async (email, password) => {
  return await api.post(
    "/user/login",
    { email, password },
    { withCredentials: true }
  );
};

const signup = async (pseudo, email, password) => {
  return await api.post("/user/register", {
    pseudo,
    email,
    password,
  });
};

const userLogout = async () => {
  return await api.get("/user/logout", { withCredentials: true });
};

const userListener = async () => {
  return await api.get("/jwtid", { withCredentials: false });
};

export {
  signin,
  signup,
  userLogout,
  userListener,
  getUserById,
  uploadFile,
  updateBiography,
  getAllUsers,
  follow_user,
  unfollow_user,
  getAllPosts,
  add_post,
  like_post,
  unlike_post,
  update_post,
  delete_post,
  add_comment,
  edit_comment,
  delete_comment,
};
