"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _httpStatusCodes = require("http-status-codes");
var errorHandle = function errorHandle(err, req, res, next) {
  var statusCodes = err.statusCode || _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR;
  var msg = err.message || 'something went wrongs, please try later';
  res.status(statusCodes).json({
    msg: msg
  });
};
var _default = exports["default"] = errorHandle;