import api from "./api";

const getAllPosts = async () => {
  return await api.get("/post");
};

const add_post = async (data) => {
  return await api.post("/post", data);
};

const like_post = async (postId, userId) => {
  return await api.patch(`/post/like/${postId}`, { idLiker: userId });
};

const unlike_post = async (postId, userId) => {
  return await api.patch(`/post/unlike/${postId}`, { idLiker: userId });
};

const update_post = async (postId, message) => {
  return await api.put(`/post/${postId}`, { message });
};

const delete_post = async (postId) => {
  return api.delete(`post/${postId}`);
};

const add_comment = async (postId, commenterId, text, commenterPseudo) => {
  return await api.patch(`/post/comment/${postId}`, {
    commenterId,
    text,
    commenterPseudo,
  });
};

const edit_comment = async (postId, commentId, text) => {
  return await api.patch(`/post/edit-comment/${postId}`, { commentId, text });
};

const delete_comment = async (postId, commentId) => {
  return await api.patch(`/post/delete-comment/${postId}`, { commentId });
};

export {
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
