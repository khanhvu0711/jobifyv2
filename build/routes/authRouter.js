"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _validationMiddleware = require("../middlewares/validationMiddleware");
var _authController = require("../controllers/authController");
var _userController = require("../controllers/userController");
var router = (0, _express.Router)();
router.route('/register').post(_validationMiddleware.validateCreateUserInput, _authController.register);
router.get('/current-user', _userController.getCurrentUser);
router.route('/login').post(_authController.loginUser);
router.route('/logout').get(_authController.logoutUser);
router.route('/:id', _validationMiddleware.validateUser).put(_authController.editUser);
var _default = exports["default"] = router;