import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "w.print.decoetgravure@gmail.com",
    password: bcrypt.hashSync("wprint000.+", 10),
    isAdmin: true,
  },
  {
    name: "User",
    email: "user@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
