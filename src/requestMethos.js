import axios from "axios";

export const NEW_URL = "http://localhost:5000";
const Base_URL = `${NEW_URL}/api`;
// Parse the admin string only if it's not null or undefinedDs

export const publicRequest = axios.create({
  baseURL: Base_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const makeRequestWithToken = async (
  url,
  token,
  isAdmin,
  method,
  data = null
) => {
  try {
    const response = await publicRequest({
      url: `${Base_URL}/${url}`,
      method,
      headers: {
        ...publicRequest.defaults.headers,
        token: `Bearer ${token}`,
        admin: isAdmin,
      },
      data,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
