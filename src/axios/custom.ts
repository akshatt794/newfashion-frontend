const apiUrl = import.meta.env.VITE_API_URL; // Should end with /api
import axios from "axios";
const customFetch = axios.create({
  baseURL: apiUrl,
  withCredentials: false,
});
export default customFetch;
