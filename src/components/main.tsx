import React from "react";
import Header from "./header";
import { Route, Routes } from "react-router-dom";
import NotFoundView from "./notFound";
import Home from "./home";
import Cafes from "./cafe/cafes";
import Employees from "./employee/employees";

const Main: React.FC = () => {
  return React.useMemo(
    () => (
      <>
        <Header />
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="cafes" Component={Cafes}></Route>
          <Route path="employees" Component={Employees}></Route>
          <Route path="*" Component={NotFoundView}></Route>
        </Routes>
      </>
    ),
    []
  );
};

export default Main;
