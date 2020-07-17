'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Day = require('./Day');

var _Day2 = _interopRequireDefault(_Day);

var _DayOfWeek = require('./DayOfWeek');

var _DayOfWeek2 = _interopRequireDefault(_DayOfWeek);

var _Week = require('./Week');

var _Week2 = _interopRequireDefault(_Week);

var _dateFns = require('date-fns');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    var date = props.date;
    var month = void 0;
    if (date) {
      month = props.date;
    } else {
      month = props.month;
    }
    _this.state = {
      date: date,
      month: month
    };

    _this.previous = _this.previous.bind(_this);
    _this.next = _this.next.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.viewChanged = _this.viewChanged.bind(_this);
    return _this;
  }

  _createClass(Calendar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.viewChanged();
    }
  }, {
    key: 'handleClick',
    value: function handleClick(date) {
      var flag = this.props.onSelect(date, this.state.date, this.state.month);

      if (flag === true) {
        this.setState({
          date: new Date(date)
        });
      } else if (flag === false) {
        this.setState({
          date: null
        });
      }
    }
  }, {
    key: 'previous',
    value: function previous() {
      this.setState({
        month: (0, _dateFns.sub)(this.state.month, { months: 1 })
      }, this.viewChanged);
    }
  }, {
    key: 'next',
    value: function next() {
      this.setState({
        month: (0, _dateFns.add)(this.state.month, { months: 1 })
      }, this.viewChanged);
    }
  }, {
    key: 'viewChanged',
    value: function viewChanged() {
      var _props = this.props,
          onViewChanged = _props.onViewChanged,
          startOfWeekIndex = _props.startOfWeekIndex;


      if (!onViewChanged) {
        return;
      }

      var month = this.state.month;


      var start = (0, _dateFns.setDay)((0, _dateFns.startOfMonth)(month), startOfWeekIndex);
      var end = (0, _dateFns.setDay)((0, _dateFns.endOfMonth)(month), 7 + startOfWeekIndex);

      onViewChanged(month, start, end);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          startOfWeekIndex = _props2.startOfWeekIndex,
          dayRenderer = _props2.dayRenderer,
          dayOfWeekFormat = _props2.dayOfWeekFormat;


      var classes = ['Calendar', this.props.className].join(' ');

      var today = new Date();

      var format = dayOfWeekFormat && dayOfWeekFormat !== '' ? dayOfWeekFormat : 'EEEEEE';
      var date = this.state.date;
      var month = this.state.month;

      var current = (0, _dateFns.setDay)((0, _dateFns.startOfMonth)(month), startOfWeekIndex);

      if ((0, _dateFns.getDay)(current) > 1 && (0, _dateFns.getDay)(current) < 7) {
        current = (0, _dateFns.subDays)(current, 7);
      }

      var end = (0, _dateFns.setDay)((0, _dateFns.endOfMonth)(month), 7 + startOfWeekIndex);

      if ((0, _dateFns.getDay)(end) > 7) {
        end = (0, _dateFns.subDays)(end, 7);
      }

      var elements = [];
      var days = [];
      var week = 1;
      var i = 1;
      var daysOfWeek = [];
      var day = new Date(current.getTime());
      for (var j = 0; j < 7; j++) {
        var dayOfWeekKey = 'dayOfWeek' + j;
        daysOfWeek.push(_react2.default.createElement(_DayOfWeek2.default, { key: dayOfWeekKey, date: new Date(day.getTime()), format: format }));
        day = (0, _dateFns.add)(day, { days: 1 });
      }
      while ((0, _dateFns.isBefore)(current, end)) {
        var dayClasses = this.props.dayClasses(current);
        if (!(0, _dateFns.isSameMonth)(current, month)) {
          dayClasses = dayClasses.concat(['other-month']);
        }
        var props = {
          date: new Date(current.getTime()),
          selected: date,
          month: month,
          today: today,
          classes: dayClasses,
          handleClick: this.handleClick
        };

        var children = void 0;
        if (!!dayRenderer) {
          children = dayRenderer(props);
        }

        days.push(_react2.default.createElement(
          _Day2.default,
          _extends({ key: i++ }, props),
          children
        ));
        current = (0, _dateFns.add)(current, { days: 1 });
        if ((0, _dateFns.getDay)(current) === startOfWeekIndex) {
          var weekKey = 'week' + week++;
          elements.push(_react2.default.createElement(
            _Week2.default,
            { key: weekKey },
            days
          ));
          days = [];
        }
      }

      var nav = void 0;

      if (this.props.useNav) {
        nav = _react2.default.createElement(
          'tr',
          { className: 'month-header' },
          _react2.default.createElement(
            'th',
            { className: 'nav previous' },
            _react2.default.createElement(
              'button',
              { className: 'nav-inner', onClick: this.previous, type: 'button' },
              '\xAB'
            )
          ),
          _react2.default.createElement(
            'th',
            { colSpan: '5' },
            _react2.default.createElement(
              'span',
              { className: 'month' },
              (0, _dateFns.format)(month, 'MMMM')
            ),
            ' ',
            _react2.default.createElement(
              'span',
              { className: 'year' },
              (0, _dateFns.format)(month, 'yyyy')
            )
          ),
          _react2.default.createElement(
            'th',
            { className: 'nav next' },
            _react2.default.createElement(
              'button',
              { className: 'nav-inner', onClick: this.next, type: 'button' },
              '\xBB'
            )
          )
        );
      } else {
        nav = _react2.default.createElement(
          'tr',
          { className: 'month-header' },
          _react2.default.createElement(
            'th',
            { colSpan: '7' },
            _react2.default.createElement(
              'span',
              { className: 'month' },
              (0, _dateFns.format)(month, 'MMMM')
            ),
            ' ',
            _react2.default.createElement(
              'span',
              { className: 'year' },
              (0, _dateFns.format)(month, 'yyyy')
            )
          )
        );
      }

      return _react2.default.createElement(
        'table',
        { className: classes },
        _react2.default.createElement(
          'thead',
          null,
          nav
        ),
        _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            { className: 'days-header' },
            daysOfWeek
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          elements
        )
      );
    }
  }]);

  return Calendar;
}(_react.Component);

Calendar.defaultProps = {
  month: new Date(),
  dayClasses: function dayClasses() {
    return [];
  },
  useNav: true,
  startOfWeekIndex: 0,
  dayOfWeekFormat: 'EEEEEE'
};
Calendar.propTypes = {
  onSelect: _propTypes2.default.func.isRequired,
  date: _propTypes2.default.object,
  month: _propTypes2.default.object,
  dayClasses: _propTypes2.default.func,
  useNav: _propTypes2.default.bool,
  startOfWeekIndex: _propTypes2.default.number,
  dayRenderer: _propTypes2.default.func,
  dayOfWeekFormat: _propTypes2.default.string,
  onViewChanged: _propTypes2.default.func
};

exports.default = Calendar;
module.exports = exports.default;