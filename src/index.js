import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { WhoAreWe } from "./routes/WhoAreWe"
import { Home } from "./routes/Home"
import { Workshops } from "./routes/Workshops"
import { Privacy } from "./routes/Privacy"
import { Calendar } from "./routes/Calendar"
import { NotFound } from "./routes/NotFound"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/who" element={<WhoAreWe />} />
        <Route path="/workshop" element={<Workshops />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
