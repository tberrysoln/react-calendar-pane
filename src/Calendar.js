import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Day from './Day';
import DayOfWeek from './DayOfWeek';
import Week from './Week';
import { format as formatDate, startOfMonth, endOfMonth, isBefore, isSameMonth, add, sub, subDays, getDay, setDay } from "date-fns";

class Calendar extends Component {
  constructor(props) {
    super(props);
    let date = props.date;
    let month;
    if (date) {
      month = props.date;
    } else {
      month = props.month;
    }
    this.state = {
      date: date,
      month: month,
    };

    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.viewChanged = this.viewChanged.bind(this);
  }

  componentWillMount() {
    this.viewChanged();
  }

  handleClick(date) {
    const flag = this.props.onSelect(date, this.state.date, this.state.month);

    if (flag === true) {
      this.setState({
        date: new Date(date),
      });
    } else if (flag === false) {
      this.setState({
        date: null,
      });
    }
  }

  previous() {
    this.setState({
      month: sub(this.state.month, { months: 1 }),
    }, this.viewChanged);
  }

  next() {
    this.setState({
      month: add(this.state.month, { months: 1 }),
    }, this.viewChanged);
  }

  viewChanged() {
    let { onViewChanged, startOfWeekIndex } = this.props;

    if (!onViewChanged) {
      return;
    }

    let { month } = this.state;

    const start = setDay(startOfMonth(month), startOfWeekIndex);
    const end = setDay(endOfMonth(month), 7 + startOfWeekIndex);

    onViewChanged(month, start, end);
  }

  render() {
    const { startOfWeekIndex, dayRenderer, dayOfWeekFormat } = this.props;

    const classes = ['Calendar', this.props.className].join(' ');

    const today = new Date();

    const format = (dayOfWeekFormat && dayOfWeekFormat !== '') ? dayOfWeekFormat : 'EEEEEE'
    const date = this.state.date;
    const month = this.state.month;

    let current = setDay(startOfMonth(month), startOfWeekIndex);

    if (getDay(current) > 1 && getDay(current) < 7) {
      current = subDays(current, 7);
    }

    let end = setDay(endOfMonth(month), 7 + startOfWeekIndex);

    if (getDay(end) > 7) {
      end = subDays(end, 7);
    }

    const elements = [];
    let days = [];
    let week = 1;
    let i = 1;
    const daysOfWeek = [];
    let day = new Date(current.getTime());
    for (let j = 0; j < 7; j++) {
      const dayOfWeekKey = 'dayOfWeek' + j;
      daysOfWeek.push(<DayOfWeek key={dayOfWeekKey} date={new Date(day.getTime())} format={format} />);
      day = add(day, { days: 1 })
    }
    while (isBefore(current, end)) {
      let dayClasses = this.props.dayClasses(current);
      if (!isSameMonth(current, month)) {
        dayClasses = dayClasses.concat(['other-month']);
      }
      let props = {
        date: new Date(current.getTime()),
        selected: date,
        month: month,
        today: today,
        classes: dayClasses,
        handleClick: this.handleClick,
      };

      let children;
      if (!!dayRenderer) {
        children = dayRenderer(props);
      }

      days.push(
        <Day key={i++} {...props}>
          {children}
        </Day>
      );
      current = add(current, { days: 1 })
      if (getDay(current) === startOfWeekIndex) {
        let weekKey = 'week' + week++;
        elements.push(<Week key={weekKey}>{days}</Week>);
        days = [];
      }
    }

    let nav;

    if (this.props.useNav) {
      nav = (
        <tr className="month-header">
          <th className="nav previous">
            <button className="nav-inner" onClick={this.previous} type="button">
              «
            </button>
          </th>
          <th colSpan="5">
            <span className="month">{formatDate(month, 'MMMM')}</span>{' '}
            <span className="year">{formatDate(month, 'yyyy')}</span>
          </th>
          <th className="nav next">
            <button className="nav-inner" onClick={this.next} type="button">
              »
            </button>
          </th>
        </tr>
      );
    } else {
      nav = (
        <tr className="month-header">
          <th colSpan="7">
            <span className="month">{formatDate(month, 'MMMM')}</span>{' '}
            <span className="year">{formatDate(month, 'yyyy')}</span>
          </th>
        </tr>
      );
    }

    return (
      <table className={classes}>
        <thead>{nav}</thead>
        <thead>
          <tr className="days-header">{daysOfWeek}</tr>
        </thead>
        <tbody>{elements}</tbody>
      </table>
    );
  }
}
Calendar.defaultProps = {
  month: new Date(),
  dayClasses: () => [],
  useNav: true,
  startOfWeekIndex: 0,
  dayOfWeekFormat: 'EEEEEE',
};
Calendar.propTypes = {
  onSelect: PropTypes.func.isRequired,
  date: PropTypes.object,
  month: PropTypes.object,
  dayClasses: PropTypes.func,
  useNav: PropTypes.bool,
  startOfWeekIndex: PropTypes.number,
  dayRenderer: PropTypes.func,
  dayOfWeekFormat: PropTypes.string,
  onViewChanged: PropTypes.func,
};

export default Calendar;
