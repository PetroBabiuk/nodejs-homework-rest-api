const { BadRequest } = require('http-errors')

const validation = (schema) => {
  const validationMiddleware = (req, _, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      const newError = new BadRequest(error.message)
      next(newError)
    }
    next()
  }
  return validationMiddleware
}

module.exports = validation
