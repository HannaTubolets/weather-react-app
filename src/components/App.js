import React from "react";
import Form from "../components/Form/Form";

import css from "../components/App.module.css";
import "../styles.css";

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
