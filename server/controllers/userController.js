import { config } from "dotenv";
config();
import User from "../models/userSchema.js";
import AppError from "../utils/error.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import { console } from "inspector";
import sendEmail from "../utils/nodemailer.js";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production' ? true : false,
  sameSite:'None',
  secure: true
};

const register = async (req, res, next) => {
  const { fullName, email, password, dateofjoining, department, salary, role } =
    req.body;
  console.log(req.body);

  if (
    (!fullName || !email || !password,
    !dateofjoining,
    !department,
    !salary,
    !role)
  ) {
    return next(new AppError("All fields are required", 400));
  }

  const userExists = await User.findOne({
    email,
  });
  if (userExists) {
    return next(new AppError("Email already exits", 400));
  }
  const user = await User.create({
    fullName,
    email,
    password,
    dateofjoining,
    department,
    salary,
    role,
    Avatar: {
      public_id: email,
      secure_url:
        "https://res.cloudinary.com/dz6c061ci/image/upload/v1705403922/lms/ruy8ak49bzlh3n8wulyv.jpg",
    },
  });

  if (!user) {
    return next(new AppError("user registration failed please try again", 400));
  }

  // TODO file upload
  // console.log(req.file)

  if (("file", req.file)) {
    console.log(req.file);
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });
      console.log(result);
      if (result) {
        user.Avatar.public_id = result.public_id;
        user.Avatar.secure_url = result.secure_url;

        //remove file from server

        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (e) {
      return next(
        new AppError(error || "file not upload ,please try again", 500)
      );
    }
  }

  await user.save();

  try {
    await sendEmail({
      to: email,
      subject: `Welcome to the Company, ${fullName}!`,
      text: `Hi ${fullName},\n\nWelcome to the company! We're thrilled to have you join our team.`,
      html: `<h1>Welcome, ${fullName}!</h1><p>We're thrilled to have you join our team.</p> For login with our Website this is your Email ID ${email} and Password ${password}`,
    });

    console.log("Welcome email sent successfully!");
  } catch (error) {
    console.error("Error sending welcome email:", error.message);
  }
  user.password = undefined;

  const token = await user.generateJWTtoken();
  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    success: true,
    message: "New Employee registered successfully",
    user,
  });
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("All fields are required", 400));
    }
    const user = await User.findOne({
      email,
    }).select("+password"); // ye ish liye kiya hai taki password bhi mile data base se
    if (!user || !user.comparePassword(password)) {
      return next(new AppError("Email or password does not match", 400));
    }

    const token = await user.generateJWTtoken();
    user.password = undefined;
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "User Login Successfully",
      user,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

const logout = (req, res) => {
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User Logout Successfully",
  });
};

const getProfile = async (req, res, next) => {
  // console.log(req.user)
  try {
    const userId = req.user.id;
    console.log("userid", userId);

    const user = await User.findById(userId);
    console.log(user);
    res.status(200).json({
      success: true,
      message: "user details",
      user,
    });
  } catch (e) {
    return next(new AppError("failed to fetch profile"));
  }
};

const getUserDetails = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    console.log("userdetails");
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "user details",
      user,
    });
  } catch (e) {
    return next(new AppError("failed to fetch user details"));
  }
};

const deleteuser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "user deleted",
      user,
    });
  } catch (e) {
    return next(new AppError("failed to delete user"));
  }
};

const getallEmployees = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  console.log("page");

  console.log("Pagination:", { page, limit, skip });

  try {
    const user = await User.find().skip(skip).limit(limit).sort({ _id: 1 });

    if (!user || user.length === 0) {
      console.log("No users found");
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    console.log("Users fetched:", user);

    res.status(200).json({
      success: true,
      message: "All users retrieved successfully",
      user,
    });
  } catch (e) {
    // console.error('Error fetching users:', e);
    return next(new AppError("Failed to fetch employees", 500));
  }
};

const searchEmployee = async (req, res, next) => {
  console.log("function called");
  console.log(req.query.email);
  const email = req.query.email;
  console.log(email);

  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
    res.status(200).json({
      success: true,
      message: "user find",
      user,
    });
  } catch (e) {
    return next(new AppError("Failed to fetch employees", 500));
  }
};

export {
  register,
  login,
  logout,
  getProfile,
  getUserDetails,
  deleteuser,
  getallEmployees,
  searchEmployee,
};
