import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;
const instance = axios.create({
  baseURL: apiUrl,
});
export const instanceAuth = axios.create({
  baseURL: authUrl,
});

export default instance;
