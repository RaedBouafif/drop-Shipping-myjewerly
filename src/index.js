import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { RecoilRoot } from "recoil"

const state = {
  url: "http://localhost/myjewery/backend"
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
