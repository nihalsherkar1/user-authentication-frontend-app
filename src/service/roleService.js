import axios from "axios";

export const fetchRoles = async () => {
  try {
    const result = await axios.get("http://localhost:8080/api/role/roles");
    console.log(await result.data);
    return result.data;
  } catch (error) {
    console.error("Error fetching roles: ", error);
    throw error;
  }
};
