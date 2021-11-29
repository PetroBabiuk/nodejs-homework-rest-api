const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')

const { User } = require('../../model')

const avatarsDir = path.join(__dirname, '../../public/avatars')

const updateAvatar = async (req, res) => {
  const { _id } = req.user
  const { path: tmpUpload, originalname } = req.file
  const fileName = `${_id}_${originalname}`
  try {
    const resultUpload = path.join(avatarsDir, fileName)
    Jimp.read(tmpUpload, (err, name) => {
      if (err) throw err
      name.resize(250, 250).write(resultUpload)
    })
    await fs.rm(tmpUpload)
    const avatarURL = path.join('/avatars', fileName)
    const result = await User.findByIdAndUpdate(
      _id,
      { avatarURL },
      { new: true }
    )
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    await fs.unlink(tmpUpload)
    throw error
  }
}

module.exports = updateAvatar
