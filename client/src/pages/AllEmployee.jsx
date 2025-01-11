import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteEmployee,
  getAllEmployee,
  searchem,
} from "../Redux/Slices/AuthSlice";
import { FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AllEmployee() {
  const { AllEmployee ,data } = useSelector((state) => state.auth);
  
  const email = data.email
  const EmployeeDetails = AllEmployee.filter((employee)=>employee.email !==email)
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Fetch employees based on page when component mounts or page changes
  useEffect(() => {
    if (!search) {
      dispatch(getAllEmployee(page));
    }
  }, [dispatch, page, search]);

  async function handleSearch() {
    if (search.trim()) {
      const res = await dispatch(searchem(search.trim()));
      if (res?.payload?.success) {
        console.log(AllEmployee);
      }
    } else {
      await dispatch(getAllEmployee(page));
    }
  }

  const handleDelete = async (id) => {
    console.log(`Delete employee with ID: ${id}`);

    // Add delete logic here
    const res = await dispatch(deleteEmployee(id));
  };

  const handleEdit = (id) => {
    console.log(`Edit employee with ID: ${id}`);
    // Add edit logic here
  };

  const handleGoBack = () => {
    navigate("/admin"); // Adjust the route as needed
  };

  async function handlePrevButton() {
    setPage((prev) => prev - 1);
    const res = await dispatch(getAllEmployee(page));
    if (res?.payload?.success) {
      console.log(AllEmployee);
      toast.success("Previous page loaded successfully");
    }
  }

  async function handleNextButton() {
    setPage((prev) => prev + 1);
    const res = await dispatch(getAllEmployee(page));
    if (res?.payload?.success) {
      console.log(AllEmployee);
      toast.success("Next page loaded successfully");
    }
  }
  return (
    <div className="min-h-screen bg-yellow-50 p-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-yellow-600">All Employees</h1>
        <div className="flex items-center mt-4 md:mt-0">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Email"
            className="px-4 py-2 border rounded-l-lg focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-600 text-white px-4 py-2 rounded-r-lg hover:bg-yellow-500"
          >
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Go Back Button */}
      <button
        onClick={handleGoBack}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 mb-4"
      >
        Go Back to Admin Panel
      </button>

      {/* Employee Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-yellow-600 text-white">
              <th className="py-2 px-4">Avatar</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Department</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {EmployeeDetails && EmployeeDetails.length > 0 ? (
              EmployeeDetails.map((employee) => (
                <tr key={employee._id} className="border-t">
                  <td className="py-2 px-4">
                    <img
                      src={employee.Avatar?.secure_url}
                      alt={employee.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-2 px-4">{employee.fullName}</td>
                  <td className="py-2 px-4">{employee.email}</td>
                  <td className="py-2 px-4">{employee.department}</td>
                  <td className="py-2 px-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(employee._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-400"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-yellow-600 font-bold"
                >
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-4 space-x-2">
        {page > 1 && (
          <button
            onClick={handlePrevButton}
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-500"
          >
            Previous
          </button>
        )}
        <button
          onClick={handleNextButton}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-500"
        >
          Next
        </button>
      </div>
    </div>
  );
}
