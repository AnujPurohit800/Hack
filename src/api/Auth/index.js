import axios from "../../config/axiosconfig";
export const signUpRequest = async ({ email, password,studentId ,name }) => {
  try {
    const response = await axios.post("/users/signup", {
      email,
      name,
      studentId,
      password,
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};

export const signInRequest = async ({ studentId, password }) => {
  try {
    const response = await axios.post("/users/signin", {
      studentId,
      password,
    });
    return response.data;
  } catch (error) {
    console.log("This is error",error);
    throw error.response.data;
  }
};