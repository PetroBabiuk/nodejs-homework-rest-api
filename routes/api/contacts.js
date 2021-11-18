const express = require('express')
const Joi = require('joi')

const contactsOperations = require('../../model')

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).required(),
})

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsOperations.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await contactsOperations.getContactById(id)
    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Contact with ${id} not found`,
      })
      return
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: error.message,
      })
      return
    }
    const result = await contactsOperations.addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await contactsOperations.removeContact(id)
    if (result.length === 0) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Contact with ${id} not found`,
      })
      return
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: error.message,
      })
      return
    }
    const { id } = req.params
    const result = await contactsOperations.updateContact(id, req.body)
    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Contact with ${id} not found`,
      })
      return
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
