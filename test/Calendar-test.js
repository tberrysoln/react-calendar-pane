import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import Calendar from '../src/Calendar';
import asserter from './assertions/Asserter';
import chai from 'chai';
import { format as formatDate, startOfMonth, endOfMonth, isBefore, isSameMonth, add, sub, subDays, getDay, setDay } from "date-fns";

const expect = chai.expect;

describe('Calendar', () => {
  const onSelect = () => true;

  it('displays the correct year', () => {
    const calendar = (
      <Calendar date={new Date('03/04/2015')} onSelect={onSelect} />
    );

    asserter(calendar).assertYear('2015');
  });

  it('displays the correct month', () => {
    const calendar = (
      <Calendar date={new Date('04/03/2015')} onSelect={onSelect} />
    );

    asserter(calendar).assertMonth('April');
  });

  it('should be able to go to previous month', () => {
    const calendar = (
      <Calendar date={new Date('04/03/2015')} onSelect={onSelect} />
    );

    asserter(calendar)
      .previousMonth()
      .assertMonth('March');
  });

  it('should tell you when you move months', done => {
    const callback = (month, start, end) => {
      expect(formatDate(month, "MMMM")).to.equal("March");
      expect(formatDate(start, "MM/dd/yyyy")).to.equal("03/01/2015");
      expect(formatDate(end, "MM/dd/yyyy")).to.equal("04/05/2015");
      done();
    };

    const calendar = (
      <Calendar date={new Date('04/03/2015')} onSelect={onSelect} onViewChanged={callback} />
    );

    asserter(calendar)
      .previousMonth();
  });

  it('should be able to go to next month', () => {
    const calendar = (
      <Calendar date={new Date('04/03/2015')} onSelect={onSelect} />
    );

    asserter(calendar)
      .nextMonth()
      .assertMonth('May');
  });

  it('should trigger the callback with selected date when clicking a day', done => {
    const callback = selectedDate => {
      expect(formatDate(new Date(selectedDate), "MM/dd/yyyy")).to.equal('04/08/2015');
      done();
    };

    const calendar = (
      <Calendar date={new Date('04/03/2015')} onSelect={callback} />
    );

    asserter(calendar).clickDay(8);
  });

  it('should set selected date to selected', () => {
    const calendar = (
      <Calendar date={new Date('04/03/2015')} onSelect={onSelect} />
    );

    asserter(calendar)
      .clickDay(8)
      .assertSelectedDay(8);
  });

  it('should add class to today', () => {
    const calendar = <Calendar date={new Date()} onSelect={onSelect} />;

    asserter(calendar).assertToday();
  });

  it("day of week format defaults to 'EEEEEE' when format is invalid", () => {
    const formats = ['', null];

    formats.forEach((format) => {
      const calendar = (
        <Calendar date={new Date()} onSelect={onSelect} dayOfWeekFormat={format} />
      );

      asserter(calendar).assertDayOfTheWeek(format);
    });
  });

  it('displays day of the week following a given format', () => {
    const formats = ['EEEE', 'EEEEE', 'EEEEEE'];

    formats.forEach((format) => {
      const calendar = (
        <Calendar date={new Date()} onSelect={onSelect} dayOfWeekFormat={format} />
      );

      asserter(calendar).assertDayOfTheWeek(format);
    });
  });
});
