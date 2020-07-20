import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  scryRenderedDOMComponentsWithClass,
  findRenderedDOMComponentWithClass,
  renderIntoDocument,
} from 'react-dom/test-utils';
import {
  format as formatDate,
  startOfMonth,
  endOfMonth,
  isBefore,
  isSameMonth,
  add,
  sub,
  subDays,
  getDay,
  setDay,
} from 'date-fns';

import chai from 'chai';

const expect = chai.expect;

export default jsx => {
  const calendar = renderIntoDocument(jsx);

  return {
    assertYear(expectedYear) {
      const year = findRenderedDOMComponentWithClass(calendar, 'year');
      expect(findDOMNode(year).textContent).to.equal(expectedYear);
      return this;
    },

    assertMonth(expectedMonth) {
      const month = findRenderedDOMComponentWithClass(calendar, 'month');
      expect(findDOMNode(month).textContent).to.equal(expectedMonth);
      return this;
    },

    previousMonth() {
      const previous = findRenderedDOMComponentWithClass(calendar, 'previous');
      Simulate.click(previous.firstChild);
      return this;
    },

    nextMonth() {
      const next = findRenderedDOMComponentWithClass(calendar, 'next');
      Simulate.click(next.firstChild);
      return this;
    },

    assertSelectedDay(expectedDay) {
      const selected = findRenderedDOMComponentWithClass(calendar, 'selected');
      const value = findDOMNode(selected).textContent;
      expect(+value).to.equal(expectedDay);
      return this;
    },

    assertToday() {
      const today = findRenderedDOMComponentWithClass(calendar, 'today');
      const value = findDOMNode(today).textContent;
      expect(value).to.equal(formatDate(new Date(), 'd'));
      return this;
    },

    clickDay(date) {
      const days = scryRenderedDOMComponentsWithClass(calendar, 'Day');
      const found = days.filter(day => {
        const value = findDOMNode(day).dataset.day;
        return +value === date;
      });
      Simulate.click(found[0].firstChild);
      return this;
    },

    assertDayOfTheWeek(dayOfWeekFormat) {
      const daysOfTheWeek = scryRenderedDOMComponentsWithClass(
        calendar,
        'DayOfWeek'
      );
      let currentDayOfTheWeek = 0;

      daysOfTheWeek.forEach(dayOfTheWeek => {
        const currentDate = setDay(new Date(), currentDayOfTheWeek);
        const format =
          dayOfWeekFormat && dayOfWeekFormat !== ''
            ? dayOfWeekFormat
            : 'EEEEEE';
        const value = findDOMNode(dayOfTheWeek).textContent;

        expect(value).to.equal(formatDate(new Date(currentDate), format));

        currentDayOfTheWeek++;
      });

      return this;
    },
  };
};
