import React, { useState, useEffect } from "react";
import useMedicos from "../hooks/useMedicos";
import ModalEdit from "../components/ModalEdit";

import CrearMedico from "../components/CrearMedico";
import ModalEditMedico from "../components/ModalEditMedico";
function PanelAdmin() {
  const [medicos, setMedicos] = useState([]);
  const [turnosVisibles, setTurnosVisibles] = useState({});
  const { getListaMedicos, getListaTurnos } = useMedicos();
  const [vieModalEdit, setViewModalEdit] = useState(false);
  const [vieModalEditMedico, setViewModalEditMedico] = useState(false);
  const agregarMedico = (nuevoMedico) => {
    setMedicos((prev) => [...prev, nuevoMedico]);
  };
  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await getListaMedicos();
        setMedicos(response.listamedicos || []);
      } catch (error) {
        console.error("Error al cargar médicos:", error);
      }
    };
    fetchMedicos();
  }, []);

  const toggleTurnos = async (id) => {
    if (turnosVisibles[id]) {
      // Ocultar si ya están visibles
      setTurnosVisibles((prev) => ({ ...prev, [id]: null }));
    } else {
      try {
        const response = await getListaTurnos(id);
        setTurnosVisibles((prev) => ({
          ...prev,
          [id]: response.objLista || [],
        }));
      } catch (error) {
        console.error("Error al obtener turnos:", error);
        setTurnosVisibles((prev) => ({ ...prev, [id]: [] }));
      }
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gestión de Médicos</h2>
      <div className="overflow-x-auto   flex items-center md:items-start  flex-col md:flex-row gap-4">
        <CrearMedico set={agregarMedico} />

        <table className="min-w-full md:min-w-1/6 bg-white border border-blue-700 shadow-xl rounded-xl overflow-hidden text-sm sm:text-base">
          <thead>
            <tr className="bg-blue-800 text-white uppercase text-sm tracking-wide">
              <th className="py-3 px-4 border-b border-blue-700">Nombre</th>
              <th className="py-3 px-4 border-b border-blue-700">
                Especialidad
              </th>
              <th className="py-3 px-4 border-b border-blue-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medicos.map((medico) => (
              <React.Fragment key={medico._id}>
                <tr className="hover:bg-blue-50 transition">
                  <td className="py-3 px-4 border-b border-blue-200 text-blue-900">
                    {medico.nombre} {medico.apellido}{" "}
                    <b className="text-blue-700">
                      {medico.turnos.length > 0
                        ? `Turnos: ${medico.turnos.length}`
                        : null}
                    </b>
                  </td>
                  <td className="py-3 px-4 border-b border-blue-200 text-blue-900">
                    {medico.tipoDeMedico}
                  </td>
                  <td className="py-3 px-4 border-b border-blue-200 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => {
                        setViewModalEditMedico(true);
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs sm:text-sm"
                    >
                      Editar
                    </button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs sm:text-sm">
                      Borrar
                    </button>
                    <button
                      onClick={() => toggleTurnos(medico._id)}
                      className="bg-indigo-700 text-white px-3 py-1 rounded hover:bg-indigo-800 text-xs sm:text-sm"
                    >
                      {turnosVisibles[medico._id]
                        ? "Ocultar Turnos"
                        : "Mostrar Turnos"}
                    </button>
                  </td>
                </tr>

                {turnosVisibles[medico._id] && (
                  <tr>
                    <td colSpan="3" className="px-4 py-2 bg-blue-50">
                      <ul className="space-y-1">
                        {turnosVisibles[medico._id].length === 0 ? (
                          <li className="text-blue-500 text-sm">
                            No hay turnos registrados.
                          </li>
                        ) : (
                          turnosVisibles[medico._id].map((turno, index) => (
                            <li
                              key={index}
                              className="text-sm text-blue-900 border-b border-blue-100 py-1 flex justify-between items-center"
                            >
                              <span>
                                <strong>
                                  {turno.nombrePaciente}{" "}
                                  {turno.apellidoPaciente}
                                </strong>{" "}
                                - {turno.hora} -{" "}
                                {new Date(turno.fecha).toLocaleDateString()}
                              </span>
                              <button
                                onClick={() => setViewModalEdit(true)}
                                className="ml-2 text-indigo-800 underline text-xs sm:text-sm"
                              >
                                Opciones
                              </button>
                              {vieModalEdit && (
                                <ModalEdit
                                  onClose={setViewModalEdit}
                                  pNombrePaciente={turno.nombrePaciente}
                                  pApellidoPaciente={turno.apellidoPaciente}
                                  pTelPaciente={turno.telPaciente}
                                  pFecha={turno.fecha}
                                  pHora={turno.hora}
                                  pIde={turno._id}
                                  pCreatedAt={turno.pCreatedAt}
                                />
                              )}
                            </li>
                          ))
                        )}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {vieModalEditMedico ? (
          <ModalEditMedico onClose={setViewModalEditMedico} />
        ) : null}
      </div>
    </div>
  );
}

export default PanelAdmin;
