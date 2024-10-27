import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authService } from "../services/authServices";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userData = { email, password };
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_URL}/login`,
        userData
      );
      const user = response.data.user.role;
      const token = response.data.token;
      const userid = response.data.user.phone;
      if (token) {
        toast.info("User Logged in Successfully");
        authService.setToken(token);
        if (user === "admin") {
          navigate("/admin");
        } else if (user === "user") {
          navigate("/Restorent");
        } else if (user === "owner") {
          navigate(`/ResDetails/${userid}`);
        }
      } else {
        toast.error("Incorrect Username/Password");
      }
    } catch (error) {
      toast.error("Invalid Username");
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center px-4 sm:px-8">
      <h1 className="text-4xl mb-8 text-center">Login</h1>
      <div className="bg-slate-700 p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm md:max-w-md lg:max-w-lg">
        {/* Email input */}
        <label className="block mb-2 text-white">Email</label>
        <input
          className="w-full border border-gray-300 text-black rounded-md px-3 py-2 mb-4"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Password input */}
        <label className="block mb-2 text-white">Password</label>
        <input
          className="w-full border border-gray-300 text-black rounded-md px-3 py-2 mb-4"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Login button */}
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handleLogin}
        >
          Login
        </button>
        {/* Register button */}
        <Link to="/Register" className="block text-center">
          <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
