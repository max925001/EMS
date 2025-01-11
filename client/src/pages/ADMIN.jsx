import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaUsers, FaChartPie } from 'react-icons/fa';
import { getAllEmployee } from '../Redux/Slices/AuthSlice';
import { useDispatch } from 'react-redux';

function Admin() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

async function handleviewEmployee(){

navigate('/all-employees')
const res = await dispatch(getAllEmployee(1))
console.log(res)

}
  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-yellow-50 text-gray-900'
      } flex flex-col`}
    >
      {/* Header */}
      <header
        className={`p-5 text-center font-bold text-2xl relative ${
          darkMode ? 'bg-yellow-500 text-gray-900' : 'bg-yellow-600 text-white'
        }`}
      >
        Admin Panel

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-5 right-5 px-4 py-2 bg-gray-200 rounded-full text-sm font-medium hover:bg-gray-300"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* Go to Home Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-5 left-5 px-4 py-2 bg-gray-200 rounded-full text-sm font-medium hover:bg-gray-300"
        >
          Home
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {/* Add New Employee */}
        <div
          className={`relative group p-6 rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white'
          }`}
          onClick={() => navigate('/add-employee')}
        >
          <div
            className={`absolute inset-0 w-full h-full bg-yellow-500 opacity-0 group-hover:opacity-30 transition`}
          ></div>
          <img
            src="https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/businessman_add.png"
            alt="Add Employee"
            className="w-full h-32 object-cover rounded mb-4"
          />
          <FaUserPlus className="text-yellow-500 text-5xl mb-4" />
          <h3 className="text-xl font-bold">Add New Employee</h3>
          <p className="text-gray-600 mt-2 group-hover:text-gray-800 dark:group-hover:text-gray-300">
            Add new employees to the system with all their details.
          </p>
        </div>

        {/* View All Employees */}
        <div
          className={`relative group p-6 rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white'
          }`}
          onClick={handleviewEmployee}
          

       
        >
          <div
            className={`absolute inset-0 w-full h-full bg-yellow-500 opacity-0 group-hover:opacity-30 transition`}
          ></div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTksnMvD_g1TCP7iMr2SfXIVH1UvRCEdzsODA&s"
            alt="All Employees"
            className="w-full h-32 object-cover rounded mb-4"
          />
          <FaUsers className="text-yellow-500 text-5xl mb-4" />
          <h3 className="text-xl font-bold">View All Employees</h3>
          <p className="text-gray-600 mt-2 group-hover:text-gray-800 dark:group-hover:text-gray-300">
            Manage and view all employee details in one place.
          </p>
        </div>

        {/* Dashboard */}
        <div
          className={`relative group p-6 rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white'
          }`}
          onClick={() => navigate('/dashboard')}
        >
          <div
            className={`absolute inset-0 w-full h-full bg-yellow-500 opacity-0 group-hover:opacity-30 transition`}
          ></div>
          <img
            src="https://leanexcelsolutions.com/wp-content/uploads/2022/11/Customer-Analytics-Dashboard-in-Excel-1.png"
            alt="Dashboard"
            className="w-full h-32 object-cover rounded mb-4"
          />
          <FaChartPie className="text-yellow-500 text-5xl mb-4" />
          <h3 className="text-xl font-bold">Dashboard</h3>
          <p className="text-gray-600 mt-2 group-hover:text-gray-800 dark:group-hover:text-gray-300">
            Analyze data and visualize employee statistics.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`p-3 text-center ${
          darkMode ? 'bg-yellow-500 text-gray-900' : 'bg-yellow-600 text-white'
        }`}
      >
        © 2025 Employee Management System
      </footer>
    </div>
  );
}

export default Admin;
