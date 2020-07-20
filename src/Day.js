import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { format, isSameDay } from 'date-fns';

class Day extends Component {
  render() {
    const {
      today,
      date,
      selected,
      classes,
      handleClick,
      children,
    } = this.props;

    const classNames = ['Day'];
    if (isSameDay(today, date)) {
      classNames.push('today');
    }
    if (selected && isSameDay(selected, date)) {
      classNames.push('selected');
    }

    let body;
    if (!!children) {
      body = children;
    } else {
      body = (
        <button
          className="Day-inner"
          onClick={() => handleClick(date)}
          type="button"
        >
          {format(date, 'd')}
        </button>
      );
    }

    return (
      <td
        className={[...classNames, ...classes].join(' ')}
        data-date={date.toISOString()}
        data-day={format(date, 'd')}
      >
        {body}
      </td>
    );
  }
}

Day.propTypes = {
  handleClick: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  today: PropTypes.instanceOf(Date).isRequired,
  selected: PropTypes.object,
  children: PropTypes.node,
};

export default Day;
