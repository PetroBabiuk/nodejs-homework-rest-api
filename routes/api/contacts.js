const express = require('express')

const { contacts: ctrl } = require('../../controllers')
const {
  validation,
  authenticate,
  controllerWrapper
} = require('../../middlewares')
const { joiSchema } = require('../../model/contact')

const router = express.Router()

router.get('/', authenticate, controllerWrapper(ctrl.getAll))

router.get('/:id', authenticate, controllerWrapper(ctrl.getById))

router.post(
  '/',
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.add)
)

router.delete('/:id', authenticate, controllerWrapper(ctrl.removeById))

router.put(
  '/:id',
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.updateById)
)

router.patch(
  '/:id/favorite',
  authenticate,
  controllerWrapper(ctrl.updateStatusContact)
)

module.exports = router
