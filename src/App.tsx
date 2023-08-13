import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/home";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/main";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
};

export default React.memo(App);
