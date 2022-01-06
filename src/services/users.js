import api from "./api";

const getUserById = async (uid) => {
  return await api.get(`/user/${uid}`);
};

const uploadFile = async (data) => {
  return await api.post(`/user/upload`, data);
};

const updateBiography = async (id, bio) => {
  return await api.put(`/user/${id}`, { bio });
};

const getAllUsers = async () => {
  return await api.get(`/user`);
};

const follow_user = async (followerId, idToFollow) => {
  return await api.patch(`/user/follow/${followerId}`, { idToFollow });
};

const unfollow_user = async (followerId, idToUnfollow) => {
  return await api.patch(`/user/unfollow/${followerId}`, { idToUnfollow });
};

export {
  getUserById,
  uploadFile,
  updateBiography,
  getAllUsers,
  follow_user,
  unfollow_user,
};
