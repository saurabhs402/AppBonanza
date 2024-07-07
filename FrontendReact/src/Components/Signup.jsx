import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = function () {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const password2 = useRef();
  const navigate = useNavigate();
  const handleSubmit = async function (e) {
    e.preventDefault();
    console.log(email.current.value);
    console.log(password.current.value);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", {
        email: email.current.value,
        username:username.current.value,
        password: password.current.value,
        password2:password2.current.value
      });
      console.log(response);
      console.log(response.status);
      console.log(typeof response.status);
      if (response.status === 201) {
        // Authentication successful, save token or session
        localStorage.setItem("token", response.data.access);
        // Redirect to protected page
        navigate("/userLogin");
        console.log("Login Successful");
        alert('Successfully Signed Up, Now Login with Credentials')
      }
    } catch (error) {
      // Authentication failed, display error message
      console.error("Login failed:", error);
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert("Login failed. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-gradient-to-r from-gray-900 to-gray-800 justify-center h-screen dark">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">Signup</h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              ref={email}
              placeholder="Email"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="email"
              name="username"
            />
            <input
              ref={username}
              placeholder="User Name"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              name="username"
            />
            <input
              ref={password}
              placeholder="Password"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="password"
              name="password"
            />
            <input
              ref={password2}
              placeholder="Confirm Password"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="password"
              name="password"
            />

            <button
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              type="submit"
            >
              Signup
            </button>
          </form>
          <div className="text-sm text-white text-center mt-[1.6rem]">
            Already have an account |{"   "}
            <a className="text-sm text-blue-500" href="/login">
              Login here!
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
