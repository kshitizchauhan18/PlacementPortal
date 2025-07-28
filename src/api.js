import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Spring Boot runs on 8080 by default
});

export default api;
