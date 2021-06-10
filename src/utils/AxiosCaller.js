import axios from "axios";

const AxiosCaller = axios.create({
  baseURL: "http://localhost:5002/api",
  withCredentials: true,
});

export default AxiosCaller;
