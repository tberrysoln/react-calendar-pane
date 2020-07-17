"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Week = function Week(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    "tr",
    { className: "Week" },
    children
  );
};

exports.default = Week;
module.exports = exports.default;