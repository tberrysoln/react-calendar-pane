import React from 'react';
import PropTypes from 'prop-types';
import { format as formatDate } from 'date-fns';

const DayOfWeek = props => {
  const { date, format } = props;

  return <th className="DayOfWeek">{formatDate(date, format)}</th>;
};

DayOfWeek.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  format: PropTypes.string,
};

export default DayOfWeek;
