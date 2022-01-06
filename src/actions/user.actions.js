import {
  follow_user,
  getUserById,
  unfollow_user,
  updateBiography,
  uploadFile,
} from "../services";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const getUser = (uid) => {
  return async (dispatch) => {
    try {
      const user = await getUserById(uid);
      dispatch({ type: GET_USER, payload: user.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const uploadPicture = (data, id) => {
  return async (dispatch) => {
    try {
      const res = await uploadFile(data);

      if (res?.data?.errors) {
        dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
      } else {
        dispatch({ type: GET_USER_ERRORS, payload: "" });
        const user = await getUserById(id);

        dispatch({ type: UPLOAD_PICTURE, payload: user?.data?.picture });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const updateBio = (id, bio) => {
  return async (dispatch) => {
    try {
      await updateBiography(id, bio);

      dispatch({ type: UPDATE_BIO, payload: bio });
    } catch (err) {
      console.log(err);
    }
  };
};

export const followUser = (followerId, idToFollow) => {
  return async (dispatch) => {
    try {
      await follow_user(followerId, idToFollow);
      dispatch({ type: FOLLOW_USER, payload: { idToFollow } });
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const unfollowUser = (followerId, idToUnfollow) => {
  return async (dispatch) => {
    try {
      await unfollow_user(followerId, idToUnfollow);
      dispatch({ type: UNFOLLOW_USER, payload: { idToUnfollow } });
    } catch (err) {
      console.log(err.message);
    }
  };
};
