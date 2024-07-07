import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import UserApps from "./Components/UserApps";
import AdminLogin from "./Components/AdminLogin";
import AddApp from "./Components/AddApp";

const App = () => {
  const isAuthenticated = localStorage.getItem("token");
  const isAdminAuthenticated = localStorage.getItem("admin");
  console.log(isAdminAuthenticated)

  const PrivateRoute = ({ element, ...props }) => {
     console.log(isAuthenticated);
    return isAuthenticated ? element : <Navigate to="/login" replace />;
  };

 const PrivateAdminRoute = ({ element, ...props }) => {
   console.log(isAdminAuthenticated);
   return isAdminAuthenticated ? (
     element
   ) : (
     <Navigate to="/adminLogin" replace />
   );
 };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userLogin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route
          path="/userApps"
          element={<PrivateRoute element={<UserApps />} />}
        />
        <Route
          path="/addApps"
          element={<PrivateAdminRoute element={<AddApp />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
