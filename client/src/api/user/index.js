import { API } from "../../setup/backend-manager";
import axios from "axios";

// getUser - Function to handle getUser API
export const getUser = async ({ userId, token }) => {
  try {
    const { data } = await axios.get(`${API}/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};
