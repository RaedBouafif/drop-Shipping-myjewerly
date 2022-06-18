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
  },
  panier: {
    products: [{
      image: "/assets/icons/cross.png",
      title: "baligh products",
      qte: 2,
      price: 50,
      id: "qs54"
    }]
  }
}



const reducer = (data = state, action) => {
  switch (action.type) {
    case 1:
      return { ...state, isLogged: true, clid: action.id }
    case 100:
      data.panier.products = data.panier.products.filter(element => element.id != action.id)
      return data
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
