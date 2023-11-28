"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _userController = require("../controllers/userController");
var _validationMiddleware = require("../middlewares/validationMiddleware");
var _authMiddleware = require("../middlewares/authMiddleware");
var _multerMiddlewres = _interopRequireDefault(require("../middlewares/multerMiddlewres"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.route('/').get(_validationMiddleware.validateCheckAdmin, _userController.getAllUser);
router.get('/current-user', _userController.getCurrentUser);
router.get('/admin/app-stats', (0, _authMiddleware.authorrizePermission)('admin'), _userController.getApplicationStats);
router.put('/update-user', _multerMiddlewres["default"].single('image'), _userController.updateUser);
var _default = exports["default"] = router;