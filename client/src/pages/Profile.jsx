import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profile() {
  const user = useSelector((state) => state.auth.data);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center p-6">
      {/* Profile Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
        {/* Header with Avatar */}
        <div className="relative bg-yellow-500 h-40 flex items-center justify-center">
          <img
            src={
              user.Avatar.secure_url ||
              "https://via.placeholder.com/150?text=No+Image" // Default image if no avatar URL
            }
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
          />
        </div>

        {/* Card Content */}
        <div className="p-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
            {user.fullName}
          </h1>
          <p className="text-gray-500">{user.role}</p>

          {/* Decorative Divider */}
          <div className="w-20 mx-auto mt-4 mb-6 border-t-4 border-yellow-500"></div>

          {/* User Details */}
          <div className="space-y-4">
            <div>
              <span className="block font-semibold text-gray-700">Email:</span>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div>
              <span className="block font-semibold text-gray-700">
                Department:
              </span>
              <p className="text-gray-600">{user.department}</p>
            </div>
            <div>
              <span className="block font-semibold text-gray-700">
                Date of Joining:
              </span>
              <p className="text-gray-600">{user.dateofjoining}</p>
            </div>
            <div>
              <span className="block font-semibold text-gray-700">Status:</span>
              <p className="text-gray-600">{user.status}</p>
            </div>
            <div>
              <span className="block font-semibold text-gray-700">Salary:</span>
              <p className="text-gray-600">₹{user.salary.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-yellow-500 py-4 text-center">
          <Link to="/"><button className="px-6 py-2 bg-white text-yellow-500 font-semibold rounded-lg shadow-md hover:bg-yellow-400 hover:text-white transition">
            Go Back
          </button></Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
