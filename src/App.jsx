import React from 'react';
import Form from '../src/components/Form/Form';
import Cities from './components/Cities/Cities';
import Video from '../src/components/video/video-2.mp4';

import css from '../src/App.module.css';

export default function App() {
  return (
    <div className={css.intro}>
      <video autoPlay loop muted className={css.videoBackground}>
        <source src={Video} type="video/mp4" />
      </video>
      <div className={css.introMedia}>
        <header>
          <Cities />
        </header>
        <main>
          <div className={css.introContent}>
            <Form />
          </div>
        </main>
        <footer>
          <p className={css.footer}>
            This project was created by Hanna Tubolets and is open sourced{' '}
            <a
              className={css.footerLink}
              href="https://github.com/HannaTubolets/weather-react-app"
              target="_blank"
              rel="noreferrer noopener"
            >
              on GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
