"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyJWT = exports.createJWT = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var createJWT = exports.createJWT = function createJWT(payload) {
  var token = _jsonwebtoken["default"].sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  return token;
};
var verifyJWT = exports.verifyJWT = function verifyJWT(token) {
  var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
  return decoded;
};