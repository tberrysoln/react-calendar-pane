'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dateFns = require('date-fns');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Day = function (_Component) {
  _inherits(Day, _Component);

  function Day() {
    _classCallCheck(this, Day);

    return _possibleConstructorReturn(this, (Day.__proto__ || Object.getPrototypeOf(Day)).apply(this, arguments));
  }

  _createClass(Day, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          today = _props.today,
          date = _props.date,
          selected = _props.selected,
          classes = _props.classes,
          handleClick = _props.handleClick,
          children = _props.children;


      var classNames = ['Day'];
      if ((0, _dateFns.isSameDay)(today, date)) {
        classNames.push('today');
      }
      if (selected && (0, _dateFns.isSameDay)(selected, date)) {
        classNames.push('selected');
      }

      var body = void 0;
      if (!!children) {
        body = children;
      } else {
        body = _react2.default.createElement(
          'button',
          {
            className: 'Day-inner',
            onClick: function onClick() {
              return handleClick(date);
            },
            type: 'button'
          },
          (0, _dateFns.format)(date, 'd')
        );
      }

      return _react2.default.createElement(
        'td',
        {
          className: [].concat(classNames, _toConsumableArray(classes)).join(' '),
          'data-date': date.toISOString(),
          'data-day': (0, _dateFns.format)(date, 'd')
        },
        body
      );
    }
  }]);

  return Day;
}(_react.Component);

Day.propTypes = {
  handleClick: _propTypes2.default.func.isRequired,
  date: _propTypes2.default.instanceOf(Date).isRequired,
  today: _propTypes2.default.instanceOf(Date).isRequired,
  selected: _propTypes2.default.object,
  children: _propTypes2.default.node
};

exports.default = Day;
module.exports = exports.default;