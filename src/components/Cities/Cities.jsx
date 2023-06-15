import React from 'react';
import Weather from '../Weather/Weather';

import css from '../Cities/Cities.module.css';

const Cities = () => {
  return (
    <div>
      <ul className={css.favoriteCities}>
        <li>
          <Weather city="Kyiv" />
        </li>
        <li>
          <Weather city="London" />
        </li>
        <li>
          <Weather city="Lisbon" />
        </li>
        <li>
          <Weather city="Warsaw" />
        </li>
        <li>
          <Weather city="Paris" />
        </li>
      </ul>
    </div>
  );
};

export default Cities;
