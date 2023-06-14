import React from 'react';
import Form from '../src/components/Form/Form';

import css from '../src/App.module.css';

export default function App() {
  return (
    <div className={css.intro}>
      <div className={css.introMedia}>
        <h1>Weather App</h1>
        <div className={css.introContent}>
          <Form />
        </div>
      </div>
    </div>
  );
}
