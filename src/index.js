import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { RecoilRoot } from "recoil"

const state = {
  url: "http://127.0.0.1/jewel-git/drop-Shipping-myjewerly/backend/"
}

export const context = React.createContext()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <context.Provider value={state}>
        <App />
      </context.Provider>
    </RecoilRoot>
  </React.StrictMode >
);
