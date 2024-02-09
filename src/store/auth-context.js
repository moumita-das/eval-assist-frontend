import React, { useState } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: "",
  login: (token) => {},
  logout: () => {},
  userDetails: {
    userName: "",
    userId: "",
  },
  updateUserDetails: (details) => {},
});

const retrieveStoredToken = () => {
  return {
    token: localStorage.getItem("EVAL_ATOK"),
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);
  const [userDetails, setUserDetails] = useState({});
  const userIsLoggedIn = !!token;
  const loginHandler = (token, userId) => {
    setToken(token);
    localStorage.setItem("EVAL_ATOK", token);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("EVAL_ATOK");
  };
  const userDetailsHandler = (details) => {
    setUserDetails({
      userId: details.id,
      userName: details.userName,
    });
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    userDetails: userDetails,
    updateUserDetails: userDetailsHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
