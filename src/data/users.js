  
import bcrypt from 'bcryptjs'

const users = [
  {
    fullName: 'Admin',
    email: 'admin@example.com',
    phone: '0334664242',
    code: 'admin',
    birthday: '06/11/1998',
    gender: true,
    password: bcrypt.hashSync('123456', 10),
    role: 1,
    avatar: 'https://i.vimeocdn.com/portrait/48146126_640x640?subrect=171%2C119%2C2728%2C2676&r=cover',
  },
  {
    fullName: 'Phạm Văn Toan',
    email: 'toan@example.com',
    phone: '0123456789',
    code: 'USER01',
    birthday: '01/01/2001',
    gender: true,
    password: bcrypt.hashSync('123456', 10),
    role: 3,
    avatar: 'https://weandthecolor.com/wp-content/uploads/2019/03/1-Vans-illustrations-by-Leo-Natsume-696x684.jpg',
  },
  {
    fullName: 'Như Ngọc',
    email: 'nhungoc@example.com',
    phone: '0987654321',
    code: 'USER02',
    birthday: '01/01/2002',
    gender: true,
    password: bcrypt.hashSync('123456', 10),
    role: 3,
    avatar: 'https://weandthecolor.com/wp-content/uploads/2019/03/5-Vans-illustrations-by-Leo-Natsume-696x684.jpg',
  },
]

export default users