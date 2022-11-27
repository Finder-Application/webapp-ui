import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';

ReactDOM.hydrateRoot(
  document.querySelector('#root') as HTMLElement,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
