import bcrypt from "bcryptjs";

const users = [
  {
    firstName: "Nhã",
    lastName: "Trần Thanh",
    email: "nhatranthanh117@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    firstName: "An",
    lastName: "Lê Thuý",
    email: "nhatranthanh113@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
