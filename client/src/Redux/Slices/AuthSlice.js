import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosinstance";
import { toast } from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
  AllEmployee: [],
};

export const register = createAsyncThunk("/auth/register", async (data) => {
  console.log(data);
  try {
    const res = axiosInstance.post("user/register", data);
    toast.promise(res, {
      loading: "Wait Authentication is in progress",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Add New Employee",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?. response?. data?. message)
  }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
  console.log(data);
  try {
    const res = axiosInstance.post("user/login", data);
    toast.promise(res, {
      loading: "Wait Authentication is in progress",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Login",
    });
    return (await res).data;
  } catch (error) {}
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.post("user/logout");
    console.log("logout", res);
    toast.promise(res, {
      loading: "Wait Logout is in progress",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Logout",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const getAllEmployee = createAsyncThunk(
  "/employee/all",
  async (page) => {
    try {
      const res = await axiosInstance.get("/user/getallemployee", {
        params: { page, limit: 10 },
      });

      toast.success("Employee details loaded successfully!");
      return res.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch employee details"
      );
    }
  }
);

export const searchem = createAsyncThunk(
  "/employee/search",
  async (searchTerm) => {
    try {
      console.log("Searching for employee with email:", searchTerm);

      
      const response = await axiosInstance.get("/user/searchem", {
        params: { email: searchTerm },
      });

      
      toast.success("Employee details loaded successfully!");
      return response.data;
   
    } catch (error) {
      console.error("Search error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to search employee"
      );
      return;
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "/employee/delete",
  async (userId) => {
    try {
     
      const response = axiosInstance.delete(`/user/${userId}`);

      toast.promise(response, {
        loading: "Deleting employee...",
        success: "Employee deleted successfully",
        error: "Failed to delete the employee",
      });

      
      return (await response).data;
    } catch (error) {
      
      console.error("Delete Error:", error);

      
      toast.error(
        error?.response?.data?.message || "Failed to delete the employee"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })

      .addCase(logout.fulfilled, (state, action) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = " ";
      })
      .addCase(getAllEmployee.fulfilled, (state, action) => {
        console.log(action.payload.user);

        state.AllEmployee = action.payload.user;
        console.log(state.AllEmployee);
      })
      .addCase(searchem.fulfilled, (state, action) => {
        console.log(action.payload.user);

        state.AllEmployee = [action.payload.user];
        console.log(state.AllEmployee);
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.AllEmployee = state.AllEmployee.filter(
          (employee) => employee._id !== action.payload.user._id
        );
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
