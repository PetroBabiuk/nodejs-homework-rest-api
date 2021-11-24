const { NotFound } = require('http-errors')

const { Contact } = require('../../model')

const getById = async (req, res) => {
  const { id } = req.params
  const { _id } = req.user
  const result = await Contact.findById({ owner: _id, _id: id })
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = getById
