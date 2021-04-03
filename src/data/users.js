import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Thanh Nha',
    email: 'thanhnha@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
