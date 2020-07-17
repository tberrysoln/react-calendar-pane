'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dateFns = require('date-fns');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DayOfWeek = function DayOfWeek(props) {
  var date = props.date,
      format = props.format;


  return _react2.default.createElement(
    'th',
    { className: 'DayOfWeek' },
    (0, _dateFns.format)(date, format)
  );
};

DayOfWeek.propTypes = {
  date: _propTypes2.default.instanceOf(Date).isRequired,
  format: _propTypes2.default.string
};

exports.default = DayOfWeek;
module.exports = exports.default;