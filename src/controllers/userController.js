import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'
import generateToken from '../utils/generateToken.js'

// @desc   Auth user and get token
// @route  POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { code, password } = req.body

  const user = await User.findOne({ code: code })


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
  }
  else {
    res.status(401)
    throw new Error('Invalid code or password')
  }
})

export { authUser }
