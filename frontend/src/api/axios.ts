import axios from "axios";

const API = axios.create({
  baseURL: "https://tasky-remastered.onrender.com/api",
  withCredentials: true, 
});

export default API;