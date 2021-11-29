const express = require('express')

const { auth: ctrl } = require('../../controllers')
const {
  upload,
  authenticate,
  validation,
  controllerWrapper
} = require('../../middlewares')
const { joiSchema } = require('../../model/user')

const router = express.Router()

router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup))

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login))

router.post('/logout', authenticate, controllerWrapper(ctrl.logout))

router.get('/current', authenticate, controllerWrapper(ctrl.current))

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatarURL'),
  controllerWrapper(ctrl.updateAvatar)
)

module.exports = router
