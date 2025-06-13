import React, { useEffect } from "react";

function ModalEditMedico({ onClose }) {
  const medico = {
    nombre: "meguel",
    apellido: "paulo",
    codAcess: "4504",
    tipoDeMedico: "Cardiólogo",
    role: "684b714536e17ecfbce8c94a",
    createdAt: "2025-06-13T00:42:53.082Z",
    updatedAt: "2025-06-13T00:42:53.082Z",
    turnos: [],
  };

  return (
    <React.Fragment>
      {/* Fondo oscuro solo en mobile */}
      <div className="bg-black sm:hidden fixed top-0 left-0 w-svw h-svh z-30 opacity-40"></div>

      {/* Modal principal */}
      <div className="flex flex-col bg-blue-900 text-white w-11/12 sm:w-[28rem] rounded-lg shadow-lg fixed sm:static z-50 top-0 left-0 bottom-0 right-0 m-auto p-4 gap-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-blue-400 pb-2">
          <h3 className="text-lg font-bold">Editar Médico</h3>
          <button
            onClick={() => onClose(false)}
            className="text-white text-xl hover:text-red-400"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="flex flex-col gap-2">
          <div>
            <label className="text-sm font-semibold">Nombre</label>
            <input
              type="text"
              value={medico.nombre}
              readOnly
              className="w-full p-2 mt-1 rounded bg-blue-800 border border-blue-300 text-white"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Apellido</label>
            <input
              type="text"
              value={medico.apellido}
              readOnly
              className="w-full p-2 mt-1 rounded bg-blue-800 border border-blue-300 text-white"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Código de acceso</label>
            <input
              type="text"
              value={medico.codAcess}
              readOnly
              className="w-full p-2 mt-1 rounded bg-blue-800 border border-blue-300 text-white"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Especialidad</label>
            <input
              type="text"
              value={medico.tipoDeMedico}
              readOnly
              className="w-full p-2 mt-1 rounded bg-blue-800 border border-blue-300 text-white"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Rol ID</label>
            <input
              type="text"
              value={medico.role}
              readOnly
              className="w-full p-2 mt-1 rounded bg-blue-800 border border-blue-300 text-white"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Fecha de creación</label>
            <input
              type="text"
              value={new Date(medico.createdAt).toLocaleString()}
              readOnly
              className="w-full p-2 mt-1 rounded bg-blue-800 border border-blue-300 text-white"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ModalEditMedico;
