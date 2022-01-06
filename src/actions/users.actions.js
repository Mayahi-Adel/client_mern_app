import { getAllUsers } from "../services";

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const users = await getAllUsers();
      dispatch({ type: GET_USERS, payload: users.data });
    } catch (err) {
      console.log(err);
    }
  };
};
