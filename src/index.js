import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
const state = {
  url: "http://localhost"
}


export const context = React.createContext()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <context.Provider value={state}>
      <App />
    </context.Provider>
  </React.StrictMode>
);
