import axios from "axios";

// make axios instance
const url =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL_PRODUCTION
    : process.env.REACT_APP_API_URL;
const appAxios = axios.create({
  baseURL: url,
});

export default appAxios;
