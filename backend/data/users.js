import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "iAmAdmin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "johnDoe@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "janeD@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
