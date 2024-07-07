import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = function () {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const handleSubmit = async function (e) {
    e.preventDefault();
    console.log(email.current.value);
    console.log(password.current.value);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/check-admin/",
        {
          email: email.current.value,
          password: password.current.value,
        }
      );
      console.log(response);
      console.log(response.status);
      console.log(typeof response.status);
      if (response.status === 200) {
        // Authentication successful, save token or session
        localStorage.setItem("admin",true);
        // Redirect to protected page
        navigate("/addApps");
        console.log("Login Successful");
      }
    } catch (error) {
      // Authentication failed, display error message
     
        alert("Login failed. Please try again with correct email and password.");
      
    }

      const isAdminAuthenticated = localStorage.getItem("admin");
      console.log(isAdminAuthenticated);
  };
  return (
    <>
      <div className="flex flex-col items-center bg-gradient-to-r from-gray-900 to-gray-800 justify-center h-screen dark">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">Admin Login</h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              ref={email}
              placeholder="User Name"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="email"
              name="email"
            />
            <input
              ref={password}
              placeholder="Password"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="password"
              name="password"
            />

            <button
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              type="submit"
            >
                Login
            </button>

          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
