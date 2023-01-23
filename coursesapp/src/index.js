import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import CoursesProvider from './context/courses';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CoursesProvider>
        <App/>
      </CoursesProvider>
    </BrowserRouter>
  </React.StrictMode>
);

