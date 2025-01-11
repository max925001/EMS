import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { logout } from "../Redux/Slices/AuthSlice";

function Home() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout(e) {
    e.preventDefault();

    const res = await dispatch(logout());
    console.log(res);
    if (res?.payload?.success) navigate("/login");
  }

  useEffect(() => {
    console.log(role);
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } min-h-screen flex flex-col`}
    >
      {/* Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-65 z-50"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close Sidebar Backdrop"
        ></div>
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-5 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
        aria-label="Sidebar"
      >
        <FaTimes
          className="text-2xl cursor-pointer absolute top-5 right-5 z-0"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close Sidebar"
        />

        <button
          onClick={toggleTheme}
          className="mb-5 px-4 py-2 bg-gray-700 rounded text-sm"
          aria-label="Toggle Theme"
        >
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>

        <ul>
          <li
            className="py-2 hover:underline cursor-pointer"
            onClick={() => navigate("/")}
            aria-label="Home"
          >
            Home
          </li>
          <li
            className="py-2 hover:underline cursor-pointer"
            onClick={() => navigate("/employees")}
            aria-label="All Employees"
          >
            All Employees
          </li>
          <li
            className="py-2 hover:underline cursor-pointer"
            aria-label="Contact"
          >
            Contact
          </li>
          <li
            className="py-2 hover:underline cursor-pointer"
            aria-label="About Us"
          >
            About Us
          </li>

          {role === "ADMIN" && (
            <li
              className="py-2 hover:underline cursor-pointer text-yellow-500"
              onClick={() => navigate("/admin")}
              aria-label="Admin Dashboard"
            >
              Admin Dashboard
            </li>
          )}
          {role === "MANAGER" && (
            <li
              className="py-2 hover:underline cursor-pointer text-green-500"
              onClick={() => navigate("/manager")}
              aria-label="Manager Dashboard"
            >
              Manager Dashboard
            </li>
          )}
        </ul>
        <div className="mt-5">
          <button className="px-4 py-2 bg-red-500 text-white rounded mr-2"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
          <button
            className="px-4 py-2 bg-gray-700 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

      <FaBars
        className="text-2xl cursor-pointer fixed top-5 left-5 z-50"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open Sidebar"
      />

      {/* Main Content */}
      <main className="flex flex-col justify-center items-center flex-grow p-10 md:ml-64">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl">
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-5xl font-bold leading-tight">
              Welcome to the{" "}
              <span className="text-yellow-500">
                Employee Management System
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-500">
              Efficiently manage your workforce with our comprehensive EMS
              platform, designed for admins and managers.
            </p>
            <div className="mt-8 flex justify-center md:justify-start space-x-4">
              <button className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                Get Started
              </button>
              <button className="px-6 py-3 border border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white">
                Learn More
              </button>
            </div>
          </div>
          <div className="mt-10 md:mt-0 md:w-1/2">
            <img
              src="https://www.officetimer.com/wp-content/uploads/2017/06/tackle-employee-in-effiency.jpg"
              alt="Employee management"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-5 text-center mt-auto">
        <p>Copyright 2025 Employee Management System. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <FaFacebook />
          <FaInstagram />
          <FaLinkedin />
          <FaTwitter />
        </div>
      </footer>
    </div>
  );
}

export default Home;
