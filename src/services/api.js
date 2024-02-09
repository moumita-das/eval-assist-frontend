import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_HOST}`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    console.log(token);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    // if (originalConfig.url !== "/Auth/activate" && err.message) {
    //   // access token had expired
    //   // if (err.response.status === 401 && !originalConfig._retry) {
    //   if (err.message && err.message == "Network Error") {
    //     originalConfig._retry = true;
    //     if (TokenService.getLocalRefreshToken()) {
    //       try {
    //         const rs = await instance.post("/Auth/RefreshToken", {
    //           refreshToken: TokenService.getLocalRefreshToken(),
    //           userId: TokenService.getLocalUIDToken(),
    //         });
    //         const { token, refreshToken } = rs.data;
    //         TokenService.updateLocalAccessToken(token);
    //         TokenService.updateLocalRefreshToken(refreshToken);
    //         window.dispatchEvent(new Event("storage"));
    //         return instance(originalConfig);
    //       } catch (_error) {
    //         if (
    //           _error.response.data &&
    //           _error.response.data.error === "Invalid refresh token"
    //         ) {

    //           localStorage.removeItem("EVAL_ATOK");

    //           window.location.href = "/login";
    //         }
    //         return Promise.reject(_error);
    //       }
    //     }
    //   }
    return Promise.reject(err);
  }
);
export default instance;
