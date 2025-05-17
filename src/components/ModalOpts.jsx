import React from "react";

function ModalOpts({ onClose, onVerDetalles }) {
  return (
    <div className="absolute top-8 right-0 bg-white border rounded shadow-lg w-40 z-10">
      <ul className="text-sm text-gray-700">
        <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            onVerDetalles();
            onClose();
          }}
        >
          Ver detalles
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
          onClick={() => {
            onClose();
            alert("Eliminar turno (a implementar)");
          }}
        >
          Cancelar turno
        </li>
      </ul>
    </div>
  );
}

export default ModalOpts;
