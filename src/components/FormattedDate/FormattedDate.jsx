import React from 'react';
import css from '../FormattedDate/FormattedDate.module.css';

const FormattedDate = ({ date }) => {
  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  };

  const formattedDate = date.toLocaleDateString('en-US', options);

  return <p className={css.date}>{formattedDate}</p>;
};

export default FormattedDate;
