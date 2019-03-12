"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _fs = require("fs");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mOrm =
/*#__PURE__*/
function () {
  function mOrm() {
    _classCallCheck(this, mOrm);

    _defineProperty(this, "configPathName", "./morm.config.json");
  }

  _createClass(mOrm, [{
    key: "createConnection",
    value: function () {
      var _createConnection = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var dbConfig,
            regExp,
            _regExp$exec,
            _regExp$exec2,
            type,
            username,
            password,
            host,
            port,
            database,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dbConfig = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                // Checking configuration
                console.log("ON CREATE");

                if (!(0, _lodash.isEmpty)(dbConfig)) {
                  _context.next = 8;
                  break;
                }

                if ((0, _fs.existSync)(path.join(__dirname, this.configPathName))) {
                  _context.next = 5;
                  break;
                }

                throw new Error("Configuration file morn.config is required.");

              case 5:
                this.config = require(this.configPathName);
                _context.next = 9;
                break;

              case 8:
                if (dbConfig.uri) {
                  regExp = /^(.*):\/\/(.*):(.*)@(.*):(\d+)\/(.*)$/g;
                  _regExp$exec = regExp.exec(dbConfig.uri), _regExp$exec2 = _slicedToArray(_regExp$exec, 7), type = _regExp$exec2[1], username = _regExp$exec2[2], password = _regExp$exec2[3], host = _regExp$exec2[4], port = _regExp$exec2[5], database = _regExp$exec2[6];
                  this.dbConfig = {
                    type: type,
                    username: username,
                    password: password,
                    host: host,
                    port: port,
                    database: database
                  };
                } else {
                  this.dbConfig = dbConfig;
                }

              case 9:
                console.log(this.config);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createConnection() {
        return _createConnection.apply(this, arguments);
      }

      return createConnection;
    }()
  }]);

  return mOrm;
}();

exports.default = mOrm;