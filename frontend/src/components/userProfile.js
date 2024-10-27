import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Make sure to import jwtDecode correctly
import axios from "axios";
import { authService } from "../services/authServices";

const UserProfile = () => {
  const [user, setUser] = useState(null); // Initialize as null for better conditional rendering
  const [error, setError] = useState("");
  const token = authService.getToken();
  console.log("token", token);
  let payLoad;
  if (token) {
    try {
      payLoad = jwtDecode(token);
    } catch (err) {
      console.error("Invalid token:", err.message);
      setError("Invalid token. Please log in again.");
    }
  } else {
    setError("No token found. Please log in.");
  }

  const phone = payLoad?.ph;

  useEffect(() => {
    if (!phone) return;

    axios
      .get(`${process.env.REACT_APP_LOCAL_URL}/userInfo/${phone}`)
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [phone]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col text-black justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">User Details</h1>
        <div className="text-lg">
          <p className="mb-2">
            <span className="font-semibold">Name:</span> {user.username}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Role:</span> {user.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
