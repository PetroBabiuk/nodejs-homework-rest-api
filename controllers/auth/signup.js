const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')
const fs = require('fs/promises')
const path = require('path')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')

const { User } = require('../../model')
const { sendMail } = require('../../helpers')

const avatarsDir = path.join(__dirname, '../../public/avatars')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`User with email=${email} already exist`)
  }
  const verificationToken = nanoid()
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const avatarURL = gravatar.url(email, { protocol: 'https' })
  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken
  })
  const mail = {
    to: email,
    subject: 'Confirm signup',
    text: `<a href="http://localhost3000/api/auth/verify/${verificationToken}">Click to confirm you email address</a>`
  }
  await sendMail(mail)
  const userFolder = path.join(avatarsDir, String(newUser._id))
  await fs.mkdir(userFolder)
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success'
  })
}

module.exports = signup
