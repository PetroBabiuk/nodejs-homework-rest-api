const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");

const { User } = require("../../model");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email=${email} already exist`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = await User.create({ email, password: hashPassword });
  res.status(201).json({
    status: "success",
    code: 201,
    message: "Register success",
  });
};

module.exports = signup;
