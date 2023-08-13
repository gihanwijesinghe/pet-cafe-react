import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/home";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/main";
import { Provider } from "react-redux";
import store from "./store/store";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Main />
      </Provider>
    </BrowserRouter>
  );
};

export default React.memo(App);
