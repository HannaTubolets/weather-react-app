// import React from 'react';

// import css from '../FormattedDate/FormattedDate.module.css';

// const FormattedDate = props => {
//   // console.log(props.date);

//   let days = [
//     'Sunday',
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//   ];
//   let day = days[props.date.getDay()];
//   let hours = props.date.getHours();
//   if (hours < 10) {
//     hours = `0${hours}`;
//   }
//   let minutes = props.date.getMinutes();
//   if (minutes < 10) {
//     minutes = `0${minutes}`;
//   }

//   return (
//     <p className={css.date}>
//       {day}, {hours}:{minutes}
//     </p>
//   );
// };

// export default FormattedDate;

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
