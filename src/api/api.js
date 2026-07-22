import axios from "axios";

const api = axios.create({
  baseURL: "https://campushub-backend-c9pk.onrender.com/api",
});

export default api;
