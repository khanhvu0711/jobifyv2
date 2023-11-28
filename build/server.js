"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _express = _interopRequireDefault(require("express"));
require("express-async-errors");
var _morgan = _interopRequireDefault(require("morgan"));
var dotenv = _interopRequireWildcard(require("dotenv"));
var _jobRouter = _interopRequireDefault(require("./routes/jobRouter.js"));
var _userRouter = _interopRequireDefault(require("./routes/userRouter.js"));
var _authRouter = _interopRequireDefault(require("./routes/authRouter.js"));
var _dbConnect = _interopRequireDefault(require("./config/dbConnect.js"));
var _errorHandle = _interopRequireDefault(require("./middlewares/errorHandle.js"));
var _authMiddleware = require("./middlewares/authMiddleware.js");
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _path = _interopRequireDefault(require("path"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
dotenv.config();
var app = (0, _express["default"])();
var PORT = process.env.NODE_PORT || 5100;
if (process.env.NODE_ENV === 'development') {
  app.use((0, _morgan["default"])('dev'));
}
app.set('view engine', 'ejs');
app.set('views', './views');
app.use((0, _cookieParser["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"]["static"](_path["default"].resolve(__dirname, 'public')));
app.get('/', function (req, res) {
  console.log(__dirname);
  res.send('helloword;');
});
app.get('/api/v1/test', function (req, res) {
  res.json({
    msg: 'test route'
  });
});
//job
app.use('/api/v1/jobs', _authMiddleware.authenticateUser, _jobRouter["default"]);

//user
app.use('/api/v1/auth', _authRouter["default"]);
app.use('/api/v1/users/', _authMiddleware.authenticateUser, _userRouter["default"]);
app.get('*', function (req, res) {
  res.sendFile(_path["default"].resolve(__dirname, './public', 'index.html'));
});
app.use('*', function (req, res) {
  res.status(404).json({
    msg: 'page not found'
  });
});
app.use(_errorHandle["default"]);
(0, _dbConnect["default"])();
app.listen(PORT, function () {
  console.log("server is running on port ".concat(PORT, " ...."));
});