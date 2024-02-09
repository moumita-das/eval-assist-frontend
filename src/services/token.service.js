class TokenService {
  getLocalAccessToken() {
    const token = localStorage.getItem("EVAL_ATOK");
    return token;
  }
  updateLocalAccessToken(token) {
    localStorage.setItem("EVAL_ATOK", token);
  }
}

export default new TokenService();
