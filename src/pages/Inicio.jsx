import React from "react";
import ListaTurnos from "../components/ListaTurnos";
function Inicio() {
  return (
    <div className="w-full">
      <div className="w-full bg-red-400 h-30">
        <img
          className="w-full h-full object-cover object-top"
          src="/imagenes/portada-inicio.jpeg"
          alt=""
        />
      </div>
      <div>
        <h3 className="text-center text-2xl font-mono">Pedir Turno</h3>
      </div>
      <div className="w-full bg-blue-700 overflow-x-hidden">
        <div>
          <h3>
          Turnos disponibles
          </h3>
          <p>
          </p>
        </div>
        <ListaTurnos />
      </div>
    </div>
  );
}

export default Inicio;
