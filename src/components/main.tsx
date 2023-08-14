import React from "react";
import Header from "./header";
import { Route, Routes } from "react-router-dom";
import NotFoundView from "./notFound";
import Home from "./home";
import Cafes from "./cafe/cafes";
import Employees from "./employee/employees";
import CreateCafe from "./cafe/createCafe";
import CreateEmployee from "./cafe/createCafe";

const Main: React.FC = () => {
  return React.useMemo(
    () => (
      <>
        <Header />
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="cafes" Component={Cafes}></Route>
          <Route path="cafes/create" Component={CreateCafe}></Route>
          <Route path="employees" Component={Employees}></Route>
          <Route path="employees/create" Component={CreateEmployee}></Route>
          <Route path="*" Component={NotFoundView}></Route>
        </Routes>
      </>
    ),
    []
  );
};

export default Main;
