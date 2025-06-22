import React from "react";

import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";

//import de pages
import Inicio from "./pages/Inicio";
import ListaMedicos from "./pages/ListaMedicos";
import PedirTurno from "./pages/PedirTurno";
import Login from "./pages/Login";
import PanelAdmin from "./pages/PanelAdmin";
function App() {
  return (
    <div className="bg-white flex flex-col min-h-svh w-screen overflow-x-hidden">
      <main className="w-full">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/pedir/:idMedico" element={<PedirTurno />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/paneladmin" element={<PanelAdmin />} />
          <Route path="/ListaMedicos" element={<ListaMedicos/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
