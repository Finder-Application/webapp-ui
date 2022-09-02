import { ReactIcon } from '@/assets';
import React from 'react';

export const Homepage = () => {
  return (
    <div className='App'>
      <h1>Hello world, We are Finder</h1>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src='/vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank'>
          <ReactIcon />{' '}
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};
