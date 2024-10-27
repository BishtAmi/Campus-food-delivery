// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom";
// import { authService } from "../services/authServices";

// const Register = () => {
//   const navigate = useNavigate();
//   const [username, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [otp, setOtp] = useState("");
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);

//   const handleRegister = async () => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_LOCAL_URL}/signup`,
//         {
//           username,
//           email,
//           phone,
//           password,
//           role,
//         }
//       );
//       const user = response.data.user.role;
//       const token = response.data.token;
//       const userid = response.data.user.phone;
//       toast.info("User Registered Successfully");
//       if (token) {
//         authService.setToken(token);
//         if (user === "admin") {
//           navigate("/admin");
//         } else if (user === "user") {
//           navigate("/Restorent");
//         } else if (user === "owner") {
//           navigate(`/ResDetails/${userid}`);
//         }
//       } else {
//         toast.error("User Not Registered");
//       }
//     } catch (error) {
//       toast.error("User Not Registered");
//       console.log(error);
//     }
//   };

//   const verifyMail = async () => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_LOCAL_URL}/verifyEmail`,
//         {
//           username,
//           email,
//           phone,
//           password,
//           role,
//         }
//       );
//       console.log("response", response.status);
//       if (response.status === 200) {
//         setIsOtpSent(true);
//         toast.info("OTP sent to your email");
//       }
//     } catch (error) {
//       toast.error("Failed to send OTP");
//       console.log(error);
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_LOCAL_URL}/verifyOTP`,
//         { email, otp }
//       );
//       if (response.status === 200) {
//         setIsOtpVerified(true);
//         toast.success("OTP verified successfully");
//       } else {
//         toast.error("Invalid OTP");
//       }
//     } catch (error) {
//       toast.error("Failed to verify OTP");
//       console.log(error);
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col justify-center items-center mt-16">
//       <h1 className="text-4xl mb-8">User Registration Portal</h1>
//       <div className="bg-slate-700 p-6 rounded-lg shadow-md w-80">
//         <label className="block mb-2 text-white">Name:</label>
//         <input
//           className="w-full border border-gray-300 text-black rounded-md px-3 py-2 mb-4"
//           type="text"
//           placeholder="Enter your name"
//           value={username}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <label className="block mb-2 text-white">Phone:</label>
//         <input
//           className="w-full border border-gray-300 text-black rounded-md px-3 py-2 mb-4"
//           type="text"
//           placeholder="Enter your phone number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//         <label className="block mb-2 text-white">Email:</label>
//         <input
//           className="w-full border border-gray-300 text-black rounded-md px-3 py-2 mb-4"
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <label className="block mb-2 text-white">Password:</label>
//         <input
//           className="w-full border border-gray-300 text-black rounded-md px-3 py-2 mb-4"
//           type="password"
//           placeholder="Enter your password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <label className="block mb-2 text-white">Role:</label>
//         <select
//           className="w-full border border-gray-300 text-black rounded-md px-3 py-2 mb-4"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         >
//           <option value="" disabled>
//             Select your role
//           </option>
//           <option value="owner">Owner</option>
//           <option value="user">User</option>
//         </select>
//         <button
//           className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//           onClick={verifyMail}
//           disabled={isOtpSent}
//         >
//           {isOtpSent ? "OTP Sent" : "Verify Email"}
//         </button>

//         {isOtpSent && (
//           <div className="mt-4">
//             <label className="block mb-2 text-white">Enter OTP:</label>
//             <input
//               className="w-full border border-gray-300 text-black rounded-md px-3 py-2 mb-4"
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//             <button
//               className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               onClick={verifyOtp}
//             >
//               Verify OTP
//             </button>
//           </div>
//         )}

//         <button
//           className="w-full mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//           onClick={handleRegister}
//           disabled={!isOtpVerified}
//         >
//           Register
//         </button>

//         <Link
//           to="/Login"
//           className="mt-4 block text-center text-blue-500 underline"
//         >
//           Login
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authServices";

const Register = () => {
  const navigate = useNavigate();
  const [username, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_URL}/signup`,
        {
          username,
          email,
          phone,
          password,
          role,
        }
      );
      const user = response.data.user.role;
      const token = response.data.token;
      const userid = response.data.user.phone;
      toast.info("User Registered Successfully");
      if (token) {
        authService.setToken(token);
        if (user === "admin") {
          navigate("/admin");
        } else if (user === "user") {
          navigate("/Restorent");
        } else if (user === "owner") {
          navigate(`/ResDetails/${userid}`);
        }
      } else {
        toast.error("User Not Registered");
      }
    } catch (error) {
      toast.error("User Not Registered");
      console.log(error);
    }
  };

  const verifyMail = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_URL}/verifyEmail`,
        {
          username,
          email,
          phone,
          password,
          role,
        }
      );
      if (response.status === 200) {
        setIsOtpSent(true);
        toast.info("OTP sent to your email");
      }
    } catch (error) {
      toast.error("Failed to send OTP");
      console.log(error);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_URL}/verifyOTP`,
        { email, otp }
      );
      if (response.status === 200) {
        setIsOtpVerified(true);
        toast.success("OTP verified successfully");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("Failed to verify OTP");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 py-14 sm:px-8 lg:px-16 xl:px-24 mt-8">
      <h1 className="text-4xl mb-8 text-center">User Registration</h1>
      <div className="bg-slate-700 p-6 rounded-lg shadow-md w-full max-w-md">
        <label className="block mb-2 text-white">Name:</label>
        <input
          className="w-full border border-gray-300 text-black rounded-md px-3 py-2 mb-4"
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="block mb-2 text-white">Phone:</label>
        <input
          className="w-full border border-gray-300 text-black rounded-md px-3 py-2 mb-4"
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label className="block mb-2 text-white">Email:</label>
        <input
          className="w-full border border-gray-300 text-black rounded-md px-3 py-2 mb-4"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="block mb-2 text-white">Password:</label>
        <input
          className="w-full border border-gray-300 text-black rounded-md px-3 py-2 mb-4"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="block mb-2 text-white">Role:</label>
        <select
          className="w-full border border-gray-300 text-black rounded-md px-3 py-2 mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="" disabled>
            Select your role
          </option>
          <option value="owner">Owner</option>
          <option value="user">User</option>
        </select>
        <button
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={verifyMail}
          disabled={isOtpSent}
        >
          {isOtpSent ? "OTP Sent" : "Verify Email"}
        </button>

        {isOtpSent && (
          <div>
            <label className="block mb-2 text-white">Enter OTP:</label>
            <input
              className="w-full border border-gray-300 text-black rounded-md px-3 py-2 mb-4"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
              onClick={verifyOtp}
            >
              Verify OTP
            </button>
          </div>
        )}

        <button
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleRegister}
          disabled={!isOtpVerified}
        >
          Register
        </button>

        {/* <Link
          to="/Login"
          className="mt-4 block text-center text-blue-500 underline"
        >
          Login
        </Link> */}
      </div>
    </div>
  );
};

export default Register;
