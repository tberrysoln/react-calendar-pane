import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from '../lib/Calendar.js';
import { format, isSameDay, isSameMonth, isWeekend } from 'date-fns';

const customDayRenderer = ({ handleClick, date }) => {
  return (
    <a
      className="Day-inner"
      href={'#' + format(date, 'do')}
      onClick={() => handleClick(date)}
    >
      {format(date, 'do')}
    </a>
  );
};

class Example extends Component {
  onSelect(date, previousDate, currentMonth) {
    if (isSameDay(date, previousDate)) {
      console.info('onSelect: false', date);
      return false;
    } else if (isSameMonth(currentMonth, date)) {
      console.info('onSelect: true', date);
      return true;
    } else {
      console.info('onSelect: none', date);
    }
  }

  render() {
    let dayClasses = function (date) {
      if (isWeekend(date)) {
        return ['weekend'];
      }
      return [];
    };
    return (
      <div>
        <p>Calendar with weekend</p>
        <Calendar onSelect={this.onSelect} dayClasses={dayClasses} />
        <p>Calendar without nav</p>
        <Calendar
          onSelect={this.onSelect}
          dayClasses={dayClasses}
          useNav={false}
        />
        <p>Calendar with custom day renderer</p>
        <Calendar onSelect={this.onSelect} dayRenderer={customDayRenderer} />
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById('container'));
