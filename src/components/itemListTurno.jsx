import React, { useState, useRef, useEffect } from "react";
import { IoMdMore } from "react-icons/io";
import ModalEdit from "./ModalEdit";

function ItemListTurno({
  pNombrePaciente,
  pApellidoPaciente,
  pHora,
  pFecha,
  pTelPaciente,
  pCreatedAt,
  pIde
}) {
  const [viewMiniModal, setViewMiniModal] = useState(false);
  const modalRef = useRef(null);
  const [viewEditModal, setViewEditModal] = useState(false);
  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setViewMiniModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {}, []);
  return (
    <li className="flex justify-between items-center bg-gray-100 p-2 rounded ">
      {viewEditModal ? (
        <ModalEdit
          onClose={setViewEditModal}
          pNombrePaciente={pNombrePaciente}
          pApellidoPaciente={pApellidoPaciente}
          pTelPaciente={pTelPaciente}
          pFecha={pFecha}
          pHora={pHora}
          pIde={pIde}
          pCreatedAt={pCreatedAt}
        />
      ) : null}

      <p className="text-gray-700">
        <span className="font-medium">
          {pNombrePaciente} {pApellidoPaciente}
        </span>{" "}
        : <b className="text-green-700">{pHora}</b> -{" "}
        <strong className="text-blue-700">{pFecha}</strong>
      </p>
      <div className="relative">
        <button
          onClick={() => setViewMiniModal(!viewMiniModal)}
          className="hover:bg-gray-300 active:bg-gray-400 transition w-8 h-8 rounded-full flex justify-center items-center text-gray-700"
        >
          <IoMdMore size={20} />
        </button>

        {viewMiniModal && (
          <div
            ref={modalRef}
            className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg z-10"
          >
            <ul className="text-sm text-gray-700">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setViewEditModal(true);
                  setViewMiniModal(false);
                }}
              >
                Ver detalles
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Cancelar turno
              </li>
            </ul>
          </div>
        )}
      </div>
    </li>
  );
}

export default ItemListTurno;
