import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import AuthWrapper from './components/root/AuthWrapper';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </RecoilRoot>
  </React.StrictMode>
);
