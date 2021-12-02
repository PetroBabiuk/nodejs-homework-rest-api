const { NotFound, BadRequest } = require('http-errors')

const { User } = require('../../model')
const { sendMail } = require('../../helpers')

const repeatVerify = async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new BadRequest('missing required field email')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotFound('User not found')
  }
  if (!user.verify) {
    throw new BadRequest('Verification has already been passed')
  }
  const mail = {
    to: email,
    subject: 'Confirm signup',
    text: `<a href="http://localhost3000/api/auth/verify/${user.verificationToken}">Click to confirm you email address</a>`
  }
  await sendMail(mail)
  res.json({
    message: 'Verification email sent'
  })
}

module.export = repeatVerify
