import React from 'react';
import { Toaster, resolveValue } from 'react-hot-toast';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from "./redux/store";
import { Provider } from "react-redux";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
        <App />
        <Toaster/>
    </React.StrictMode>
  </Provider>
);
