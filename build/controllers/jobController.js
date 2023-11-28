"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateJob = exports.showStats = exports.getSingleJob = exports.getAllJob1 = exports.getAllJob = exports.deleteJob = exports.createJob = void 0;
var _index = _interopRequireWildcard(require("../models/index"));
var _httpStatusCodes = require("http-status-codes");
var _customErrors = require("../utils/customErrors");
var _sequelize = require("sequelize");
var _constant = require("../utils/constant");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//let jobs = [];
// getall job
var getJobPagination = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var page,
      limit,
      search,
      offset,
      where,
      order,
      result,
      totalPage,
      data,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          page = _args.length > 0 && _args[0] !== undefined ? _args[0] : 1;
          limit = _args.length > 1 && _args[1] !== undefined ? _args[1] : 10;
          search = _args.length > 2 ? _args[2] : undefined;
          offset = (page - 1) * limit;
          where = search.where, order = search.order;
          console.log(order);
          //remove properties cannot input
          Object.keys(where).map(function (key) {
            return where[key] === 'all' && delete where[key];
          });
          _context.next = 9;
          return _index["default"].Job.findAndCountAll({
            where: where,
            include: {
              model: _index["default"].User,
              required: true,
              attributes: ['firstName', 'lastName']
            },
            order: order,
            offset: offset,
            limit: limit
          });
        case 9:
          result = _context.sent;
          if (result) {
            _context.next = 12;
            break;
          }
          throw (0, _customErrors.NotFoundErr)('no job found');
        case 12:
          totalPage = Math.ceil(result.count / limit);
          data = {
            count: result.count,
            jobs: result.rows,
            totalPage: totalPage,
            currentPage: +page
          };
          return _context.abrupt("return", data);
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getJobPagination() {
    return _ref.apply(this, arguments);
  };
}();
var getAllJob1 = exports.getAllJob1 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$query, page, limit, search, data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$query = req.query, page = _req$query.page, limit = _req$query.limit;
          search = {
            where: {
              createdBy: req.user.id
            },
            order: [['createdAt', 'DESC']]
          };
          _context2.next = 4;
          return getJobPagination(page, limit, search);
        case 4:
          data = _context2.sent;
          // const offset = (page - 1) * limit;
          // const result = await db.Job.findAndCountAll(
          //   { where: { createdBy: req.user.id } },
          //   offset,
          //   limit
          // );
          // if (!result.rows) throw new NotFoundErr('No job found');
          // const totalPage = Math.ceil(result.count / limit);
          // const data = { count: result.count, users: result.rows, totalPage };

          res.status(_httpStatusCodes.StatusCodes.OK).json(data);
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getAllJob1(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
var getAllJob = exports.getAllJob = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$query2, position, jobStatus, jobType, page, limit, sort, order, search, data;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$query2 = req.query, position = _req$query2.position, jobStatus = _req$query2.jobStatus, jobType = _req$query2.jobType, page = _req$query2.page, limit = _req$query2.limit, sort = _req$query2.sort;
          console.log('-------------------------------');
          console.log('check position', position);
          console.log('-------------------------------');
          order = [];
          _context3.t0 = sort;
          _context3.next = _context3.t0 === _constant.JOB_SORT_BY.NEWEST ? 8 : _context3.t0 === _constant.JOB_SORT_BY.OLDEST ? 8 : _context3.t0 === _constant.JOB_SORT_BY.ASCENDING ? 10 : _context3.t0 === _constant.JOB_SORT_BY.DESCENDING ? 12 : 14;
          break;
        case 8:
          order = ['createdAt', 'ASC'];
          return _context3.abrupt("break", 16);
        case 10:
          order = ['id', 'ASC'];
          return _context3.abrupt("break", 16);
        case 12:
          order = ['id', 'DESC'];
          return _context3.abrupt("break", 16);
        case 14:
          order = ['createdAt', 'DESC'];
          return _context3.abrupt("break", 16);
        case 16:
          search = {
            where: {
              createdBy: req.user.id,
              position: position ? _defineProperty({}, _sequelize.Op.like, "%".concat(position, "%")) : 'all',
              jobStatus: jobStatus || 'all',
              jobType: jobType || 'all'
            },
            order: [order]
          };
          _context3.next = 19;
          return getJobPagination(page, limit, search);
        case 19:
          data = _context3.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json(data);
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getAllJob(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
var showStats = exports.showStats = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var stats, defaultStats, monthlyApplication;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _index["default"].Job.findAll({
            where: {
              createdBy: req.user.id
            },
            attributes: ['jobStatus', [_index.sequelize.cast(_index.sequelize.fn('count', 'jobStatus'), 'decimal'), 'count']],
            group: ['jobStatus'],
            raw: true
          });
        case 2:
          stats = _context4.sent;
          stats = stats.reduce(function (acc, current) {
            var jobStatus = current.jobStatus,
              count = current.count;
            acc[jobStatus] = count;
            return acc;
          }, {});
          defaultStats = {
            pending: stats.pending || 0,
            interview: stats.interview || 0,
            decline: stats.declined || 0
          };
          monthlyApplication = [{
            date: 'May 23',
            count: 12
          }, {
            date: 'Jun 23',
            count: 10
          }, {
            date: 'Jul 24',
            count: 21
          }, {
            date: 'Aug 22',
            count: 17
          }];
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            defaultStats: defaultStats,
            monthlyApplication: monthlyApplication,
            stats: stats
          });
        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function showStats(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();
// create job
var createJob = exports.createJob = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body, company, position, email, userFound, job;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$body = req.body, company = _req$body.company, position = _req$body.position;
          email = req.user.email;
          _context5.next = 4;
          return _index["default"].User.findOne({
            where: {
              email: email
            }
          });
        case 4:
          userFound = _context5.sent;
          if (userFound) {
            _context5.next = 7;
            break;
          }
          throw new _customErrors.NotFoundErr('User not found');
        case 7:
          if (company) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", res.status(500).json({
            msg: 'Company cannot empty'
          }));
        case 9:
          _context5.next = 11;
          return _index["default"].Job.create({
            company: company,
            position: position,
            createdBy: userFound.id
          });
        case 11:
          job = _context5.sent;
          res.status(_httpStatusCodes.StatusCodes.CREATED).json({
            job: job
          });
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function createJob(_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();

//get single job
var getSingleJob = exports.getSingleJob = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var id, job;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.next = 3;
          return _index["default"].Job.findOne({
            where: {
              id: id
            },
            raw: false
          });
        case 3:
          job = _context6.sent;
          if (job) {
            _context6.next = 6;
            break;
          }
          throw new _customErrors.NotFoundErr("no job with id ".concat(id));
        case 6:
          res.status(200).json({
            msg: 'job find success',
            job: job
          });
        case 7:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function getSingleJob(_x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();

// edit job
var updateJob = exports.updateJob = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var id, job, _req$body2, company, position;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          _context7.next = 3;
          return _index["default"].Job.findOne({
            where: {
              id: id
            },
            raw: false
          });
        case 3:
          job = _context7.sent;
          if (job) {
            _context7.next = 6;
            break;
          }
          throw new _customErrors.NotFoundErr("no job with id ".concat(id));
        case 6:
          _req$body2 = req.body, company = _req$body2.company, position = _req$body2.position;
          job.set({
            company: company,
            position: position
          });
          _context7.next = 10;
          return job.save();
        case 10:
          _context7.next = 12;
          return job.reload();
        case 12:
          res.status(200).json({
            msg: 'job update successfull',
            job: job
          });
        case 13:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function updateJob(_x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}();

//delete job
var deleteJob = exports.deleteJob = function deleteJob(req, res) {
  var id = req.params.id;
  var job = jobs.find(function (job) {
    return job.id === id;
  });
  if (!job) throw new _customErrors.NotFoundErr("no job with id ".concat(id));
  var newJobs = jobs.filter(function (job) {
    return job.id !== id;
  });
  console.log(newJobs);
  jobs = newJobs;
  res.status(200).json({
    msg: 'delete job success'
  });
};