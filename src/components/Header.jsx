import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="w-full h-16 bg-blue-900 px-4 flex   items-center">
      <Link to="/">
        <h1 className="text-white text-2xl">FacuTurnos</h1>
      </Link>

      <Link to="/">Ingresar</Link>
    </header>
  );
}

export default Header;
