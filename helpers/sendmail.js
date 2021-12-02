const nodemailer = require('nodemailer')

require('dotenv').config()

const { META_PASSWORD } = process.env

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'petro.babiuk@meta.ua',
    pass: META_PASSWORD
  }
}

const transporter = nodemailer.createTransport(nodemailerConfig)

const sendMail = async (data) => {
  const email = { ...data, from: 'petro.babiuk@meta.ua' }
  await transporter.sendMail(email)
  return true
}

module.export = sendMail
