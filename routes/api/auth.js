const express = require("express");

const { auth: ctrl } = require("../../controllers");
const {
  authenticate,
  validation,
  controllerWrapper,
} = require("../../middlewares");
const { joiSchema } = require("../../model/user");

const router = express.Router();

router.post("/signup", validation(joiSchema), controllerWrapper(ctrl.signup));

router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login));

router.post(
  "/logout",
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.logout)
);

module.exports = router;
