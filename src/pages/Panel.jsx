import React, { useState, useEffect } from "react";
import { IoMdMore } from "react-icons/io";
import ModalOpts from "../components/ModalOpts";
import ModalDetalles from "../components/ModalDetalles";

const apiUrl = import.meta.env.VITE_API_URL;

function Panel() {
  const [dataMedicos, setDataMedicos] = useState([]);
  const [medicoActivo, setMedicoActivo] = useState(null);
  const [listTurnos, setListTurnos] = useState([]);
  const [loadingTurnos, setLoadingTurnos] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [detalleTurno, setDetalleTurno] = useState(null); // Turno activo para modal

  const getTurnos = async (idMedico) => {
    setLoadingTurnos(true);
    try {
      const res = await fetch(apiUrl + "/api/medico/listaturnos/" + idMedico);
      const data = await res.json();
      if (data.objLista) {
        setListTurnos(data.objLista);
        setMedicoActivo(idMedico);
      }
    } catch (err) {
      console.log("Error al obtener turnos:", err);
    } finally {
      setLoadingTurnos(false);
    }
  };

  useEffect(() => {
    fetch(apiUrl + "/api/medico/listamedicos/")
      .then((res) => res.json())
      .then((data) => {
        setDataMedicos(data.listamedicos || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Lista de Médicos</h2>

      {/* Modal de detalles */}
      <ModalDetalles
        listaTurnos={listTurnos}
        turno={detalleTurno}
        onClose={() => setDetalleTurno(null)}
      />

      <ul className="flex flex-col gap-3">
        {Array.isArray(dataMedicos) && dataMedicos.length > 0 ? (
          dataMedicos.map((medico) => (
            <li
              key={medico._id}
              className="bg-white shadow rounded p-3 hover:bg-blue-50 transition duration-200"
            >
              <button
                className="w-full text-left"
                onClick={() => {
                  if (medicoActivo === medico._id) {
                    setMedicoActivo(null);
                  } else {
                    getTurnos(medico._id);
                  }
                }}
              >
                <p className="text-lg font-semibold text-gray-800">
                  {medico.nombre} {medico.apellido} –{" "}
                  <span className="text-blue-600">{medico.tipoDeMedico}</span>
                </p>
              </button>

              {medicoActivo === medico._id && (
                <div className="mt-3 pl-3 border-l-4 border-blue-300">
                  {loadingTurnos ? (
                    <p className="text-sm text-gray-500">Cargando turnos...</p>
                  ) : listTurnos.length > 0 ? (
                    <ul className="text-sm text-gray-700 space-y-1 relative">
                      {listTurnos.map((turno, i) => (
                        <li key={i} className="relative">
                          <div className="flex justify-between items-center pr-8">
                            <p>
                              📅 {turno.fecha} 🕒 {turno.hora} –{" "}
                              {turno.nombrePaciente} {turno.apellidoPaciente}
                            </p>
                            <button
                              className="cursor-pointer rounded-full p-1 hover:bg-gray-200"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(openMenuId === i ? null : i);
                              }}
                            >
                              <IoMdMore size={20} />
                            </button>
                          </div>

                          {openMenuId === i && (
                            <ModalOpts
                              onClose={() => setOpenMenuId(null)}
                              onVerDetalles={() => setDetalleTurno(turno)}
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No hay turnos reservados.
                    </p>
                  )}
                </div>
              )}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No hay médicos disponibles.</li>
        )}
      </ul>
    </div>
  );
}

export default Panel;
