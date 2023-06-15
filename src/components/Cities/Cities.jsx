import React from 'react';
import Weather from '../Weather/Weather';

import css from '../Cities/Cities.module.css';

const Cities = () => {
  return (
    <div>
      <ul className={css.favoriteCities}>
        <li>
          <a className={css.favoriteCities} href="#"></a>
          <Weather city="Kyiv" />
        </li>
        <li>
          <a className={css.favoriteCities} href="#"></a>
          <Weather city="London" />
        </li>
        <li>
          <a className={css.favoriteCities} href="#"></a>
          <Weather city="Lisbon" />
        </li>
        <li>
          <a className={css.favoriteCities} href="#"></a>
          <Weather city="Warsaw" />
        </li>
        <li>
          <a className={css.favoriteCities} href="#"></a>
          <Weather city="Paris" />
        </li>
      </ul>
    </div>
  );
};

export default Cities;
