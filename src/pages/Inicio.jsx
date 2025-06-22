import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserMd, FaSignInAlt, FaClipboardList } from "react-icons/fa";
import Header from "../components/Header"
function Inicio() {
  const [sesionExpire, setSesionExpire] = useState(false);

  useEffect(() => {
  const storedTime = localStorage.getItem("loginTimestamp");

  if (!storedTime) {
    // No hay sesión activa
    setSesionExpire(true);
    return;
  }

  const loginTime = parseInt(storedTime, 10);
  const currentTime = Date.now();
  const twoHoursInMs = 2 * 60 * 60 * 1000;

  if (currentTime - loginTime > twoHoursInMs) {
    setSesionExpire(true);
  }
}, []);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-950 text-white p-4">
      {/* Título / Encabezado */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">
          Bienvenido al Sistema de Turnos
        </h1>
        <p className="text-cyan-200 text-lg">Hospital Central</p>
      </div>

      {/* Opciones principales */}
      <div className="grid gap-6 w-full max-w-md">
        <Link to="/login">
          <button className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition">
            <FaSignInAlt />
            Ingresar al sistema
          </button>
        </Link>

        <Link to="/ListaMedicos">
          <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition">
            <FaClipboardList />
            Pedir un Turno
          </button>
        </Link>
        
        {sesionExpire ? null : (
          <Link to="/paneladmin">
            <button className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition">
              <FaUserMd />
              Panel de Administración
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Inicio;
