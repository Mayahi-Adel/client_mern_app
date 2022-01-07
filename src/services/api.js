import axios from "axios";

const api = axios.create({
  baseURL: `https://powerful-bastion-25341.herokuapp.com/api/`,
});

export default api;
