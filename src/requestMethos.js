import axios from "axios";
const NEW_URL="https://firstprojbackend.onrender.com";
const Base_URL = `${NEW_URL}/api`;
console.log(process.env.BASE_URL)

export const publicRequest = axios.create({ baseURL: Base_URL, });