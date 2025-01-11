import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/Slices/AuthSlice";

function Login() {
  const disptch = useDispatch();
  const navigate = useNavigate();

  const [logindata, setLogindata] = useState({
    email: "",
    password: "",
  });

  function handleinput(e) {
    const { name, value } = e.target;
    setLogindata({
      ...logindata,
      [name]: value,
    });
  }

  async function OnLoginAccount(event) {
    event.preventDefault();
    console.log(logindata.email, logindata.password);

    if (!logindata.email || !logindata.password) {
      toast.error("Please fill all the details");
      return;
    }

    // Dispatch login action
    const response = await disptch(login(logindata));
    if (response?.payload?.success) {
      navigate("/");
    }

    setLogindata({
      email: "",
      password: "",
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600">
      <div className="w-[90%] max-w-[400px] bg-white rounded-lg shadow-lg p-6 text-black">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-yellow-600">EMS Login</h2>
          <p className="text-sm text-gray-600">
            Welcome back! Please log in to your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={OnLoginAccount} className="flex flex-col gap-4">
          {/* Email Input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your Email"
              className="bg-yellow-50 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onChange={handleinput}
              value={logindata.email}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label htmlFor="password" className="font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter your Password"
              className="bg-yellow-50 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onChange={handleinput}
              value={logindata.password}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded transition-all duration-300 font-semibold text-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
