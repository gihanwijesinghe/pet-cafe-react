import React from "react";
import Header from "./header";
import { Route, Routes } from "react-router-dom";
import BlogView from "./blogs";
import NotFoundView from "./notFound";
import Home from "./home";

const Main: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="blogs" Component={BlogView}></Route>
        <Route path="*" Component={NotFoundView}></Route>
      </Routes>
    </>
  );
};

export default Main;
