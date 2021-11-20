const { Contact } = require('../../model')

const removeById = async (req, res) => {
  const { id } = req.params
  const result = await Contact.findByIdAndRemove(id)
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = removeById
