import axios from "axios";

export const fetchVideos = async () => {
  try {
    const response = await axios.get("/api/videos");
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const fetchShorts = async () => {
  try {
    const response = await axios.get("/api/shorts");
    return response.data;
  } catch (error) {
    console.error("Error fetching shorts:", error);
    throw error;
  }
};


export const loginUser = async (email, password) => {
  try {
    const response = await axios.post("/api/auth", { email, password });
    return response.data.token;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post("/api/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
