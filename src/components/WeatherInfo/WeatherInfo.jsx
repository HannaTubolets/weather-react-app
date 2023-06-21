import React from 'react';
import css from './WeatherInfo.module.css';

import FormattedDate from '../FormattedDate/FormattedDate';

const WeatherInfo = ({ info }) => {
  return (
    <div>
      <div className="row">
        <div className={css.date}>
          <h2 className={css.city}>{info.name}</h2>
          <FormattedDate date={info.date} />
        </div>
        <div className="col-6">
          <ul className={css.currentPlaceDate}>
            <li className={css.characteristics}>
              <span className={css.numbers}>{info.description}</span>
            </li>
          </ul>
          <ul className={css.temperature}>
            <li className={css.characteristics}>
              <img src={info.icon} alt={info.description} width={80} />
            </li>
            <li className={css.characteristics}>
              <span className={css.numbers}>
                {Math.round(info.temperature)}°C
              </span>
            </li>
          </ul>
        </div>
        <div className="col-6">
          <ul className={css.currentPlaceDate}>
            <li className={css.characteristics}>
              Humidity:
              <span className={css.numbers}>
                {' '}
                {Math.round(info.humidity)}%{' '}
              </span>
            </li>
            <li className={css.characteristics}>
              Wind:{' '}
              <span className={css.numbers}>{Math.round(info.wind)} km/h</span>{' '}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
