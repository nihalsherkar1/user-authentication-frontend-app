import axios from "axios";

export const addUser = async (values, token) => {
  try {
    const response = axios.post(
      "http://localhost:8080/api/admin/add-user",
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding user: ", error);
    throw error;
  }
};
