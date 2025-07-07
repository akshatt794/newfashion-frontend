// src/axios/custom.ts
import axios from "axios";



const apiUrl = import.meta.env.VITE_API_URL;
// For example, in axios:
import axios from "axios";
const api = axios.create({
  baseURL: apiUrl,
});
// Usage:
api.get("/api/products"); // will call https://newfashion-backend.onrender.com/api/products

export default customFetch;
