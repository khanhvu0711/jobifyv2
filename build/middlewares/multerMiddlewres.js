"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var storage = _multer["default"].memoryStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function filename(req, file, cb) {
    var fileName = file.originalname;
    cb(null, fileName);
  }
});
var upload = (0, _multer["default"])({
  storage: storage
});
var _default = exports["default"] = upload;