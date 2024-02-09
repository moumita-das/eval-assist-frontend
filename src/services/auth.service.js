import api from "./api";

const loginUser = (username, password) => {
  return api
    .post(
      "/auth/token",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      return response.data;
    });
};
const getUserDetails = () => {
  return api.get("/get_details_for_current_user").then((response) => {
    return response.data;
  });
};
const AuthService = {
  loginUser,
  getUserDetails,
};

export default AuthService;
