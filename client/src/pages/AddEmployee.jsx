import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { register } from "../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

function AddEmployee() {
  const [previewImage, setPreviewImage] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    department: "",
    Avatar: "https://via.placeholder.com/150", // Default avatar
    dateofjoining: "",
    status: "",
    role: "",
    salary: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function getImage(event) {
    event.preventDefault();
    //getting
    const uploadImage = event.target.files[0];
    if (uploadImage) {
      setFormData({
        ...formData,
        Avatar: uploadImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        //console.log(this.result)
        setPreviewImage(this.result);
      });
    }

    console.log(formData.Avatar);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.fullName.length < 5) {
      toast.error("Name should be atleast of 5 charcters");
      return;
    }

    // password validation

    if (formData.password.length < 6 || formData.password.length > 16) {
      toast.error("Password should be 6 - 16 character long");
      return;
    }

    // Check if all fields are filled
    const requiredFields = [
      "fullName",
      "email",
      "password",
      "department",
      "dateofjoining",
      "status",
      "role",
      "salary",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error("All fields are required!");
        return;
      }
    }

    // Submit form data to backend (API call can be added here)
    const formDatas = new FormData();
    formDatas.append("fullName", formData.fullName);
    formDatas.append("email", formData.email);
    formDatas.append("password", formData.password);
    formDatas.append("Avatar", formData.Avatar);
    formDatas.append("department", formData.department);
    formDatas.append("dateofjoining", formData.dateofjoining);
    formDatas.append("status", formData.status);
    formDatas.append("role", formData.role);
    formDatas.append("salary", formData.salary);

    const res = await dispatch(register(formDatas));
    console.log(res);
    if (!res?.payload?.success) {
    }

    // Reset the form
    setFormData({
      fullName: "",
      email: "",
      password: "",
      department: "",
      Avatar: "",
      dateofjoining: "",
      status: "",
      role: "",
      salary: "",
    });
    setPreviewImage("");
  }

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 text-black">
        <div className="m-1 w-full   flex  items-center justify-between p-1">
          <Link to="/admin">
            <button className=" text-sm md:text-xl  bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
              Go Back
            </button>
          </Link>
          <h2 className="text-xl font-bold text-yellow-600  ">
            Add New Employee
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="fullName" className="font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter Full Name"
              className="bg-yellow-50 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.fullName}
              onChange={handleInput}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              className="bg-yellow-50 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.email}
              onChange={handleInput}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              className="bg-yellow-50 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.password}
              onChange={handleInput}
            />
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label htmlFor="department" className="font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              id="department"
              className="bg-yellow-50 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.department}
              onChange={handleInput}
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="R&D">R&D</option>
              <option value="HR">HR</option>
              <option value="Accounting">Accounting</option>
              <option value="Customer Care">Customer Care</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          {/* Avatar */}
          <div className="flex flex-col col-span-1 sm:col-span-2">
            <label htmlFor="Avatar" className="cursor-pointer">
              {previewImage ? (
                <img
                  className="w-24 h-24 rounded-full m-auto"
                  src={previewImage}
                />
              ) : (
                <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
              )}
            </label>
            <input
              onChange={getImage}
              type="file"
              className=""
              id="Avatar"
              name="Avatar"
              accept=".jpg, .jpeg,.png , .svg"
            />
          </div>

          {/* Date of Joining */}
          <div className="flex flex-col">
            <label
              htmlFor="dateofjoining"
              className="font-medium text-gray-700"
            >
              Date of Joining
            </label>
            <input
              type="date"
              name="dateofjoining"
              id="dateofjoining"
              className="bg-yellow-50 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.dateofjoining}
              onChange={handleInput}
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label htmlFor="status" className="font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              id="status"
              className="bg-yellow-50 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.status}
              onChange={handleInput}
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label htmlFor="role" className="font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              id="role"
              className="bg-yellow-50 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.role}
              onChange={handleInput}
            >
              <option value="">Select Role</option>
              <option value="ADMIN">ADMIN</option>
              <option value="MANAGER">MANAGER</option>
              <option value="USER">USER</option>
            </select>
          </div>

          {/* Salary */}
          <div className="flex flex-col">
            <label htmlFor="salary" className="font-medium text-gray-700">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              id="salary"
              placeholder="Enter Salary"
              className="bg-yellow-50 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.salary}
              onChange={handleInput}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="col-span-1 sm:col-span-2 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded transition-all duration-300 font-semibold text-lg"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
