import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

// @desc   Auth user and get token
// @route  POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user === null) {
    res.json({
      code: 0,
      msg: "email-not-found",
      message:
        "Email bạn nhập không kết nối với tài khoản nào. Hãy tìm tài khoản của bạn và đăng nhập. ",
      data: null,
    });
  } else if (user && (await user.matchPassword(password))) {
    if (user.token === null) {
      user.token = generateToken(user._id);
    }
    await user.save();
    res.json({
      code: 1,
      msg: "success",
      message: "Đăng nhập thành công. ",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: user.token,
      },
    });
  } else {
    res.json({
      code: 0,
      msg: "wrong-password",
      message: "Mật khẩu bạn đã nhập không chính xác. ",
      data: null,
    });
  }
});

// @desc   Get user profile
// @route  GEt /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
// @desc   update user profile
// @route  PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.token = generateToken(user._id);
      user.password = req.body.password;
    }
    const updateUser = await user.save();
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: updateUser.token,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc   Register a new user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

export { authUser, getUserProfile, registerUser, updateUserProfile };
