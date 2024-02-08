import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Landing from "./pages/Landing";

const ProtectedRoute = ({ isAllowed, redirectPath = "/landing", children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

function App() {
  const user = {
    id: "1",
    name: "mou",
    roles: ["admin", "user"],
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="landing" element={<Landing />} />
          <Route path="login" element={<SignIn />} />
          <Route element={<ProtectedRoute isAllowed={!!user} />}>
            <Route path="home" element={<Home />} />
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
