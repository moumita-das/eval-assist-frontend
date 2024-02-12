import { useContext, useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import AuthContext from "./store/auth-context";
import AuthService from "./services/auth.service";
import Questionnaire from "./pages/dashboard/Questionnaire";

const ProtectedRoute = ({ isAllowed, redirectPath = "/home", children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

function App() {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    if (!authCtx.isLoggedIn) return;
    AuthService.getUserDetails()
      .then((res) => {
        console.log(res);
        authCtx.updateUserDetails(res.user);
      })
      .catch((err) => {
        authCtx.logout();
      });
  }, [authCtx.isLoggedIn]);
  console.log(authCtx);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route element={<ProtectedRoute isAllowed={!authCtx.isLoggedIn} />}>
            <Route path="login" element={<SignIn />} />
          </Route>
          <Route element={<ProtectedRoute isAllowed={!!authCtx.isLoggedIn} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/questionnaire" element={<Questionnaire />} />
          </Route>
          {/* 
          /*}
          {/* <Route
            path="admin"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAllowed={!!user && user.roles.includes("admin")}
              >
                <Admin />
              </ProtectedRoute>
            }
          ></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
