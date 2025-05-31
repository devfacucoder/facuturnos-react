import React, { useEffect, useState } from "react";
import ItemListTurno from "./ItemListTurno";
import useMedicos from "../hooks/useMedicos";

function ItemSecretario({ nom, ape, tipmedico, ide, arrayTurnos }) {
  const [viewTurnos, setViewTurnos] = useState(false);
  const [stateListaTurnos, setStateListaTurnos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getListaTurnos } = useMedicos();

  useEffect(() => {
    const obtenerListaTurnos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getListaTurnos(ide);
        if (response.objLista) {
          setStateListaTurnos(response.objLista);
        } else {
          setStateListaTurnos([]);
          setError("No se encontraron turnos.");
        }
      } catch (err) {
        console.error("Error al obtener turnos:", err);
        setError("Error al cargar turnos.");
        setStateListaTurnos([]);
      } finally {
        setLoading(false);
      }
    };

    if (viewTurnos) {
      obtenerListaTurnos();
    }
  }, [viewTurnos]);

  return (
    <li className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg flex-wrap font-medium text-gray-800">
          <b>
            {nom} {ape}
          </b>
          <strong>- {tipmedico}</strong>
          {arrayTurnos.length > 0 ? (
            <span className="text-blue-600 flex">
              Turnos Reservados: {arrayTurnos.length}
            </span>
          ) : null}
        </p>
        <button
          onClick={() => setViewTurnos(!viewTurnos)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded transition"
        >
          {viewTurnos ? "Ocultar Turnos" : "Ver Turnos"}
        </button>
      </div>

      {viewTurnos && (
        <ul className="space-y-2 mt-2">
          {loading && (
            <li className="text-gray-500 italic">Cargando turnos...</li>
          )}

          {error && <li className="text-red-600 italic">{error}</li>}

          {!loading &&
            !error &&
            stateListaTurnos.map((turno, index) => (
              <ItemListTurno
                key={index}
                pNombrePaciente={turno.nombrePaciente}
                pApellidoPaciente={turno.apellidoPaciente}
                pTelPaciente={turno.telPaciente}
                pFecha={turno.fecha}
                pHora={turno.hora}
                pIde={turno._id}
                pCreatedAt={turno.pCreatedAt}
              />
            ))}
        </ul>
      )}
    </li>
  );
}

export default ItemSecretario;
