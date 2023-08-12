import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className="headerApp">
      <Link style={{ paddingLeft: 20 }} to="/">
        Home
      </Link>
      <Link style={{ paddingLeft: 20 }} to="/cafes">
        Cafes
      </Link>
      <Link style={{ paddingLeft: 20 }} to="/employees">
        Employees
      </Link>
    </div>
  );
};

export default Header;
