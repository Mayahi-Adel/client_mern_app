import {
  add_comment,
  add_post,
  delete_comment,
  delete_post,
  edit_comment,
  getAllPosts,
  like_post,
  unlike_post,
  update_post,
} from "../services";

//posts
export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

// comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

// Trends
export const GET_TRENDS = "GET_TRENDS";

// errors
export const GET_POST_ERRORS = "GET_POST_ERRORS";

export const getPosts = (count) => {
  return async (dispatch) => {
    try {
      const posts = await await getAllPosts();
      const array = posts.data.slice(0, count);
      dispatch({ type: GET_POSTS, payload: array });
      dispatch({ type: GET_ALL_POSTS, payload: posts.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addPost = (data) => {
  return async (dispatch) => {
    try {
      const post = await add_post(data);

      if (post?.data?.errors) {
        dispatch({ type: GET_POST_ERRORS, payload: post.data.errors });
      } else {
        dispatch({ type: GET_POST_ERRORS, payload: "" });
      }
    } catch (err) {
      console.log(err.errors);
    }
  };
};

export const likePost = (postId, userId) => {
  return async (dispatch) => {
    try {
      await like_post(postId, userId);
      dispatch({ type: LIKE_POST, payload: { postId, userId } });
    } catch (err) {
      console.log(err);
    }
  };
};

export const unlikePost = (postId, userId) => {
  return async (dispatch) => {
    try {
      await unlike_post(postId, userId);
      dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updatePost = (postId, message) => {
  return async (dispatch) => {
    try {
      await update_post(postId, message);
      dispatch({ type: UPDATE_POST, payload: { postId, message } });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      await delete_post(postId);
      dispatch({ type: DELETE_POST, payload: { postId } });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addComment = (postId, commenterId, text, commenterPseudo) => {
  return async (dispatch) => {
    try {
      add_comment(postId, commenterId, text, commenterPseudo);
      dispatch({
        type: ADD_COMMENT,
        payload: { postId, commenterId, text, commenterPseudo },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const editComment = (postId, commentId, text) => {
  return async (dispatch) => {
    try {
      edit_comment(postId, commentId, text);
      dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteComment = (postId, commentId) => {
  return async (dispatch) => {
    try {
      delete_comment(postId, commentId);
      dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getTrends = (arr) => {
  return (dispatch) => {
    dispatch({ type: GET_TRENDS, payload: arr });
  };
};
