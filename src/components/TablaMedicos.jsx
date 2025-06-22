import React, { useEffect, useState, useContext } from "react";

import useMedicos from "../hooks/useMedicos";
import {
  mmedicoSelect,
  arrayMedicosCtx,
  handleModalTurnos,
} from "../pages/PanelAdmin";

import ModalTurnos from "./Modalturnos";
function ItemMedico({ select = false, event, indice, pMedico }) {
  const [stateMedico, setStateMedico] = useContext(mmedicoSelect);
  const [viewModal, setViewModal] = useContext(handleModalTurnos);

  const [mostrarTurnos, setMostrarTurnos] = useState(false);

  const toggleTurnos = () => {
    event(indice);
    setStateMedico(pMedico);
    setMostrarTurnos((prev) => !prev);
  };

  return (
    <>
      <tr
        onClick={() => {
          event(indice);
          setStateMedico(pMedico);
        }}
        className={`border-t border-blue-700 ${
          select ? "bg-blue-700" : ""
        } hover:bg-blue-700 transition cursor-pointer`}
      >
        <td className="p-2">{pMedico.nombre}</td>
        <td className="p-2">{pMedico.apellido}</td>
        <td className="p-2">
          {pMedico.tipoDeMedico} {`[${pMedico.turnos.length}]`}
        </td>
        <td>
          <button
            className="bg-cyan-700 px-2 py-1 rounded"
            onClick={(e) => {
              e.stopPropagation(); // Para evitar que se dispare el click del <tr>
              toggleTurnos();
            }}
          >
            {mostrarTurnos ? "Ocultar" : "Ver Turnos"}
          </button>
        </td>
      </tr>

      {mostrarTurnos && (
        <tr className="bg-blue-800">
          <td colSpan="4" className="p-2">
            {pMedico.turnos.length > 0 ? (
              <table className="table-auto w-full text-white text-sm border-collapse mt-2">
                <thead>
                  <tr className="border-b border-blue-500">
                    <th className="text-left px-2 py-1">Paciente</th>
                    <th className="text-left px-2 py-1">Fecha</th>
                    <th className="text-left px-2 py-1">Hora</th>
                    <th className="text-left px-2 py-1">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pMedico.turnos.map((turno, idx) => (
                    <tr key={idx} className="hover:bg-blue-600">
                      <td className="px-2 py-1">{turno.paciente || "N/A"}</td>
                      <td className="px-2 py-1">{turno.fecha || "N/A"}</td>
                      <td className="px-2 py-1">{turno.hora || "N/A"}</td>
                      <td className="px-2 py-1">
                        <button className="bg-red-600 px-2 py-1 rounded text-xs">
                          Cancelar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-white">No hay turnos disponibles.</p>
            )}
          </td>
        </tr>
      )}
    </>
  );
}

function TablaMedicos() {
  const { getListaMedicos } = useMedicos();
  const [stateTablaMedicos, setStateTablaMedicos] = useState([]);
  const [stateMedico, setStateMedico] = useContext(mmedicoSelect);
  const [stateArrayCtxMedicos, setStateArrayCtxMedicos] =
    useContext(arrayMedicosCtx);

  const [indiceSelect, setIndiceSelect] = useState(null);

  useEffect(() => {
    const obtenerMedicos = async () => {
      const response = await getListaMedicos();

      if (response) {
        setStateArrayCtxMedicos(response.listamedicos);
      }
    };

    obtenerMedicos();
  }, []);
  return (
    <div className="bg-blue-900 w-full sm:w-2xl h-96 overflow-y-auto custom-scrollbar p-4 rounded-lg shadow">
      <table className="table-auto w-full text-white border-collapse">
        <thead className="bg-blue-800 text-left">
          <tr>
            <th className="p-2 w-1/4">Nombre</th>
            <th className="p-2 w-1/4">Apellido</th>
            <th className="p-2 w-1/4">Especialidad</th>
            <th className="p-2 w-1/4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {stateArrayCtxMedicos.length > 0 ? (
            stateArrayCtxMedicos.map((medico, index) => (
              <ItemMedico
                key={index}
                pMedico={medico}
                indice={index}
                select={indiceSelect === index ? true : false}
                event={setIndiceSelect}
              />
            ))
          ) : (
            <tr className="border-t border-blue-700 hover:bg-blue-700 transition">
              {" "}
              Cargando
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TablaMedicos;
