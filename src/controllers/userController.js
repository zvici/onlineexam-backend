import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import smtpTransport from "nodemailer-smtp-transport";
import nodemailer from "nodemailer";

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
        firstName: user.firstName,
        lastName: user.lastName,
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
  const user = await User.findById(req.body._id);
  if (user) {
    res.json({
      code: 1,
      msg: "success",
      message: `Thông tin của ${user.firstName}`,
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: user.token,
      },
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
// @desc   Get all user
// @route  GEt /api/users
// @access Private
const getAllUserProfile = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  if (users) {
    res.json({
      code: 1,
      msg: "success",
      message: "Danh sách User",
      data: users,
    });
  } else {
    res.status(404);
    throw new Error("List User Not Found");
  }
});
// @desc   update user profile
// @route  PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.token = generateToken(user._id);
      user.password = req.body.password;
    }
    const updateUser = await user.save();
    res.json({
      _id: updateUser._id,
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
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
  const { firstName, lastName, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email already exists");
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      code: 1,
      msg: "success",
      message: "Đăng ký thành công",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc   PasswordRetrieval
// @route  POST /api/users/password-retrieval
// @access Public
const passwordRetrieval = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    user.codePasswordRetrieval = randomCharacter(50);
    user.save();
    var transporter = nodemailer.createTransport(smtpTransport({
      service: "gmail",
      auth: {
        user: "nhatranthanh117@gmail.com",
        pass: "matkhaucc",
      },
    }));
    var mailOptions = {
      from: "Thanh Nhã <nhatranthanh115@gmail.com>",
      to: `${req.body.email}`,
      subject: "Password Retrieval",
      html: `<div
      style="
        background-color: #e1e2e3;
        margin: 0;
        padding: 0;
        min-width: 100%;
        width: 100%;
        height: 100%;
        line-height: 0;
        font-size: 0;
      "
    >
      <table
        style="
          table-layout: fixed;
          border-spacing: 0;
          border-collapse: collapse;
          width: 100%;
          max-width: 680px;
          min-width: 320px;
          margin: 0 auto;
          background-color: black;
        "
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="680"
      >
        <tbody>
          <tr>
            <td
              style="
                padding-bottom: 0px;
                padding-top: 0px;
                width: 100%;
                max-width: 680px;
                height: auto;
                background-image: url(https://img.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg?size=626&ext=jpg);
                background-color: #ffffff;
                background-repeat: no-repeat !important;
                background-position: center top;
                background-size: cover;
                border-collapse: collapse;
              "
              align="left"
              valign="middle"
            >
              <table
                style="
                  table-layout: auto;
                  border-spacing: 0;
                  width: 100%;
                  margin: 0 auto;
                "
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="680"
              >
                <tbody>
                  <tr>
                    <td
                      style="
                        height: 200px;
                        width: 100%;
                        text-align: center;
                        padding: 20px 5% 20px 5%;
                        background-color: transparent;
                      "
                      align="center"
                      valign="middle"
                    >
                      <a
                        href="https://hufionlineexam.web.app/"
                        style="display: block"
                        target="_blank"
                        ><img
                          src="https://knn.hufi.edu.vn/knn/images/logo/asset-160.png?width=550"
                          style="
                            margin: 0 auto 0 auto;
                            width: 250px;
                            display: block;
                          "
                          alt="Hufi Logo"
                      /></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td
              style="
                padding: 0px 0px 0px 0px;
                background-color: #ffffff;
                color: #000000;
              "
              align="left"
              valign="top"
            >
              <div
                style="padding: 10px 7% 55px 7%"
              >
                <table
                  style="
                    table-layout: fixed;
                    border-spacing: 0;
                    width: 100%;
                    margin: 0 auto;
                  "
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="680"
                >
                  <tbody>
                    <tr>
                      <td
                        style="
                          padding: 0 0 0 0;
                          background-color: #ffffff;
                          color: #000000;
                          text-align: center;
                        "
                        colspan="2"
                      >
                        <h1
                          style="
                            font-family: Arial, Helvetica, sans-serif;
                            font-size: 30px;
                            line-height: 40px;
                            font-weight: bold;
                            margin: 0px 0px 0px 0px;
                            padding: 0px 0px 30px 0px;
                            text-align: center;
                          "
                        >
                          Reset Password Request
                        </h1>
                        <p
                          style="
                            font-family: Arial, Helvetica, sans-serif;
                            font-size: 18px;
                            line-height: 30px;
                            font-weight: bold;
                            color: #000000 !important;
                            margin: 0px 0px 0px 0px;
                            padding: 0px 0px 16px 0px;
                            text-align: center;
                          "
                        >
                          Hi ${user.firstName},
                        </p>
                        <p
                          style="
                            font-family: Arial, Helvetica, sans-serif;
                            font-size: 18px;
                            line-height: 30px;
                            color: #121314;
                            margin: 0px auto 0px auto;
                            padding: 0px 0px 0 0px;
                            text-align: center;
                            max-width: 500px !important;
                          "
                        >
                          Did you forget your password? If so, please click the
                          button below to create a new one.
                        </p>
                        <div
                          style="padding: 30px 0px 30px 0px; text-align: center"
                        >
                          <div>
                            <a
                              href="https://hufionlineexam.web.app/password-retrieval/${user._id}&&${user.codePasswordRetrieval}"
                              style="
                                background-color: #00e59b;
                                color: #000000;
                                font-size: 12px;
                                line-height: 20px;
                                font-weight: bold;
                                font-family: Arial, Helvetica, sans-serif;
                                text-transform: uppercase;
                                text-align: center;
                                text-decoration: none;
                                padding: 14px 26px 14px 26px;
                                display: inline-block;
                              "
                              target="_blank"
                              >Reset Password</a
                            >
                          </div>
                        </div>
                        <p
                          style="
                            font-family: Arial, Helvetica, sans-serif;
                            font-size: 18px;
                            line-height: 30px;
                            color: #121314;
                            margin: 0px auto 0px auto;
                            padding: 0px 0px 16px 0px;
                            text-align: center;
                            max-width: 500px !important;
                          "
                        >
                          If you did not lose your password, feel free to ignore
                          this email.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div
                style="
                  padding: 30px 30px 30px 30px;
                  text-align: center;
                  color: #67737b;
                "
              >
                <div style="margin: 0 auto 0 auto; max-width: 340px !important">
                  <div style="color: #ffffff">
                    <p
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        font-size: 12px;
                        line-height: 20px;
                        letter-spacing: -0.5px;
                      "
                    >
                      Questions? Check out our
                      <a
                        href="https://hufionlineexam.web.app/"
                        style="
                          color: #ffffff;
                          text-decoration: underline;
                          font-size: 12px;
                          line-height: 20px;
                        "
                        target="_blank"
                        >Help Center</a
                      >&nbsp;to learn more.
                    </p>
                  </div>
                  <p
                    style="
                      font-family: Arial, Helvetica, sans-serif;
                      font-size: 12px !important;
                      line-height: 20px;
                    "
                  >
                    <span
                      style="
                        padding-bottom: 0px;
                        font-weight: normal;
                        font-size: 12px;
                        color: #66737c !important;
                        text-decoration: none;
                      "
                      >140 Lê Trọng Tấn, Tây Thạnh, Tân Phú, Thành phố Hồ Chí
                      Minh<br /><br /><a
                        href="https://hufionlineexam.web.app/"
                        style="
                          color: #67737b;
                          text-decoration: underline;
                          font-size: 12px;
                          line-height: 20px;
                        "
                        target="_blank"
                        >Hufionlineexam.web.app</a
                      >&nbsp;&nbsp;|&nbsp;&nbsp;<a
                        href="https://hufionlineexam.web.app/"
                        style="color: #66737c; text-decoration: underline"
                        target="_blank"
                        >Privacy Policy</a
                      ></span
                    >
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    
      <img
        src="https://ci4.googleusercontent.com/proxy/p37IAla5iNO9xH3CXq9PQ9oGujS_E0QyMSnnkoSlTYOVoUiKjeCmjVW8sDOODCCns1_PUCwWxk1Ms9PiNSKhF2PCu2mzd-ZdxBdKYv_GRkky0DIC_2bHUBOdIG-Uh4mxYYsNqQshsCIThTnIJxjB-bEKgwha_HeM4rIJcqlPgeKFrpXdfaw3VoeEiTYr3qY1s9hiErny6J8Nt7_AG51cVTfkOq9UZRPb-euy1HSgm4P6q3N45UIdmPgXMuNbSqQAKRbTMrf9A8lgRfCw1My7LwkjdrC5w5Tof290sccagutb-gqCPJAbA-DU_GKRHzwYf8zAzhHUFWzuyZZoyJ8oDHHvHn59UjeXUkp6WM44pge6G-Qcgy3J0WyfEUEW71FA8Rp98Cz4E5TrnkjuQStjxrkiHEoK5wyN8ZE_4C_n-MezoYYRWklpU4dPWwZyN8BmyJJxdhhqg3DLU-sGWa3WSAdsxNqGR8nWhvI--oxR3ElP1r5kzeNtVAcEucsNrZNN071-tXnbnSkkIz1FKQlgKj2WYoO9156UQCdnETAeYpPNY3qpqYVoJnqGpwd8QZGhSJ0hyJIM8iw=s0-d-e1-ft#https://sg.deviantart.com/wf/open?upn=qOLrzpaE1g-2FF2lTNUHyHWEQJRG6DznCdB9Iaz2U6B0tnDIhxR5QBpDOt-2F4OzWFWN4sFqzhG71RIRMJJcM-2FvSq4dJUFkdLujYOBsF1I3vtwSqRYS-2Bze72ta2BKOzUlpDqgzktIkHUQ64bgNZ7XNzTYhUsnh6kXSbskadly8J7Jwwyd9DhwmRUM7-2FKi6UwUBl64sgmNV-2BKkLYL6F0YQ8j-2BnOJ0al-2BwrUemKaLC-2BN2i-2B-2Fkp6vKEv9LgXIi-2BN-2BIqT6VkAxsbIy47gTL7ozlU-2BlDxBMJzzeEJrvXZ-2FLDugKXFdpkkNldwgEb9Of-2F7vJViSk5Rq38S6NAApGt-2FSSmcxD6egA-3D-3D"
        alt=""
        width="1"
        height="1"
        border="0"
        style="
          height: 1px !important;
          width: 1px !important;
          border-width: 0 !important;
          margin-top: 0 !important;
          margin-bottom: 0 !important;
          margin-right: 0 !important;
          margin-left: 0 !important;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          padding-right: 0 !important;
          padding-left: 0 !important;
        "
        class="CToWUd"
      />
      <div class="yj6qo"></div>
      <div class="adL"></div>
    </div>
    `,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          code: 1,
          msg: "success",
          message: "Vui lòng kiểm tra trong hộp thư email của bạn",
          data: null,
        });
        console.log("Email sent: " + info.response);
      }
    });
  } else {
    res.status(404);
    throw new Error("Email Not Found");
  }
});

// @desc   changePasswordFromEmail
// @route  POST /api/users/change-password-from-email
// @access Public
const changePasswordFromEmail = asyncHandler(async (req, res) => {
  const { id, password, codePasswordRetrieval } = req.body;
  const user = await User.findById(id);
  if (user && codePasswordRetrieval != null) {
    if (codePasswordRetrieval === user.codePasswordRetrieval) {
      user.password = password;
      user.codePasswordRetrieval = null;
      await user.save();
      res.json({
        code: 1,
        msg: "success",
        message: "Đổi mật khẩu thành công",
        data: null,
      });
    } else {
      res.json({
        code: 0,
        msg: "fail",
        message: "Liên kết này bị hỏng, vui lòng gửi lại",
        data: null,
      });
    }
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc   checkPasswordRetrieval
// @route  POST /api/users/check-password-retrieval
// @access Public
const checkPasswordRetrieval = asyncHandler(async (req, res) => {
  const { id, codePasswordRetrieval } = req.body;
  const user = await User.findById(id);
  if (
    user &&
    user.codePasswordRetrieval === codePasswordRetrieval &&
    codePasswordRetrieval != null
  ) {
    res.json({
      code: 1,
      msg: "true",
      message: "Đúng",
      data: null,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
// Random ký tự
function randomCharacter(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUserProfile,
  passwordRetrieval,
  changePasswordFromEmail,
  checkPasswordRetrieval,
};
