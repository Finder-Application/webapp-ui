import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      cacheTime: 1000 * 60 * 60 * 24,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId='894609161760-1btovlg15pcuoedtfanpkogtahetsdq7.apps.googleusercontent.com'>
        <App />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
