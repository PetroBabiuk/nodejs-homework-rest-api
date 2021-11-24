const { Contact } = require('../../model')

const removeById = async (req, res) => {
  const { id } = req.params
  const { _id } = req.user
  const result = await Contact.findByIdAndRemove({ owner: _id, _id: id })
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = removeById
