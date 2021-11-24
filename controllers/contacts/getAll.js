const { BadRequest } = require('http-errors')

const { Contact } = require('../../model')

const getAll = async (req, res) => {
  const { page, limit } = req.query
  if (isNaN(page)) {
    throw new BadRequest('Page must be a number')
  }
  if (isNaN(limit)) {
    throw new BadRequest('Limit must be a number')
  }
  const { _id } = req.user
  const skip = (page - 1) * limit
  const result = await Contact.find(
    { owner: _id },
    '_id name email phone favorite owner',
    { skip, limit: +limit }
  ).populate('owner', '_id email')
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = getAll
