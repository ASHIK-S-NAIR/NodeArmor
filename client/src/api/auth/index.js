import { API } from "../../setup/backend-manager";
import axios from "axios";

// signup - Function to handle signup API
export const signup = async (values) => {
  try {
    const { data } = await axios.post(`${API}/signup`, values);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

// login - Function to handle login API
export const login = async (values) => {
  try {
    const { data } = await axios.post(`${API}/login`, values);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//logout - Function to handle logout
export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("nodeArmor");
  }

  return true;
};

// authenticate - Function to handle authenticate, ie saves token, user details into local storage
export const authenticate = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("nodeArmor", JSON.stringify(data));
  }
};

//isAuthenticate - Function to handle isAuthenticate, checks local storage for authentication details and if present returns it.
export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("nodeArmor")) {
    return JSON.parse(localStorage.getItem("nodeArmor"));
  } else {
    return false;
  }
};
