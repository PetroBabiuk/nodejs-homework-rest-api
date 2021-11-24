const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')
const fs = require('fs/promises')
const path = require('path')
const gravatar = require('gravatar')

const { User } = require('../../model')

const avatarsDir = path.join(__dirname, '../../public/avatars')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`User with email=${email} already exist`)
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const avatarURL = gravatar.url(email)
  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL
  })
  console.log(avatarsDir)
  console.log(newUser._id)
  const userFolder = path.join(avatarsDir, String(newUser._id))
  await fs.mkdir(userFolder)
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success'
  })
}

module.exports = signup
