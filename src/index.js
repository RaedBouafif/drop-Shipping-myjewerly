import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';


const state = {
  isLogged: false,
  clid: null,
  search: {
    name: null,
    type: null
  },
  url: "http://localhost",
  notification: {
    message: null,
    visible: false,
    type: null
  }
}



const reducer = (data = state, action) => {
  switch (action.type) {
    case 1:
      return { ...state, isLogged: true, clid: action.id }
    default:
      return state
  }
}

const store = createStore(reducer)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
