import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'
import generateToken from '../utils/generateToken.js'

// @desc   Auth user and get token
// @route  POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { code, password } = req.body

  const user = await User.findOne({ code })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      code: user.code,
      birthday: user.birthday,
      gender: user.gender,
      role: user.role,
      avatar: user.avatar,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid code or password')
  }
})

// @desc   Fetch all user
// @route  GET /api/users
// @access Public
const getUsers = asyncHandler(async (req, res) => {
  const pageSize = 8
  const roleNumber = Number(req.query.role)
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        fullName: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  const count = await User.countDocuments({ role: roleNumber, ...keyword })
  const users = await User.find({ role: roleNumber, ...keyword })
    .sort({
      createdAt: -1,
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  if (users) {
    res.send({
      code: 0,
      msg: 'success',
      message: 'List all user',
      data: { users, page, pages: Math.ceil(count / pageSize) },
    })
  } else {
    throw new Error('Subject not found')
  }
})

// @desc   Fetch user detail
// @route  GET /api/subjects/:id
// @access Public
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.send({
      code: 0,
      msg: 'success',
      message: `Info User: ${user.fullName}`,
      data: user,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc   Create one user
// @route  Post /api/users/
// @access Public
const createUser = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phone,
    code,
    birthday,
    gender,
    password,
    role,
    avatar,
  } = req.body
  if (
    fullName &&
    email &&
    phone &&
    code &&
    birthday &&
    gender &&
    password &&
    role
  ) {
    let user = new User({
      fullName,
      email,
      phone,
      code,
      birthday,
      gender,
      password,
      role,
      avatar,
    })
    let newUser = await user.save()
    res.send({
      code: 0,
      msg: 'success',
      message: 'Successfully created user',
      data: newUser,
    })
  } else {
    res.status(404)
    throw new Error('Failure to create user')
  }
})

// @desc   Update one subject
// @route  Put /api/subjects/
// @access Public
const updateUser = asyncHandler(async (req, res) => {
  const { fullName, email, phone, code, birthday, gender, role, avatar } =
    req.body
  if (fullName && email && phone && code && birthday && gender && role) {
    let user = await User.findById(req.params.id)
    if (user) {
      user.fullName = fullName
      user.email = email
      user.phone = phone
      user.code = code
      user.birthday = birthday
      user.gender = gender
      user.role = role
      user.avatar = avatar
      let updateUser = await user.save()
      res.send({
        code: 0,
        msg: 'success',
        message: 'Successfully update user',
        data: updateUser,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  } else {
    res.status(404)
    throw new Error('Failure to update user')
  }
})

// @desc   Delete one subject
// @route  Del /api/subjects/
// @access Public
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.send({
      code: 0,
      msg: 'success',
      message: 'User Removed',
      data: null,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { authUser, getUsers, getUserById, createUser, updateUser, deleteUser }
