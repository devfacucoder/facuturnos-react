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
import PanelSecretario from "./pages/PanelSecretario";
function App() {
  return (
    <div className="bg-white min-h-svh w-screen ">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/ListaMedicos" element={<ListaMedicos />} />
          <Route path="/pedir/:idMedico" element={<PedirTurno />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/secretario" element={<PanelSecretario />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
