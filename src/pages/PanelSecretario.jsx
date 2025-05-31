import React, { useState, useEffect } from "react";
import ItemMedico from "../components/ItemMedico";
import useMedicos from "../hooks/useMedicos";

function PanelSecretario() {
  const [listaMedicos, setListaMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getListaMedicos } = useMedicos();

  useEffect(() => {
    const obtenerLista = async () => {
      try {
        const lista = await getListaMedicos();
        setListaMedicos(lista.listamedicos);
      } catch (err) {
        console.error("Error al obtener la lista de médicos:", err);
        setError("Hubo un problema al cargar los médicos.");
        setListaMedicos([]);
      } finally {
        setLoading(false);
      }
    };
    obtenerLista();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-8 text-gray-600">Cargando médicos...</p>
    );
  }

  if (error) {
    return <p className="text-center mt-8 text-red-600">{error}</p>;
  }

  return (
    <div className="w-full flex justify-center items-start py-6">
      <ul className="flex flex-col w-11/12 bg-gray-100 p-4 rounded-lg shadow">
        {listaMedicos.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No hay médicos registrados.
          </p>
        ) : (
          listaMedicos.map((medico) => (
            <ItemMedico
            arrayTurnos={medico.turnos}
              key={medico._id}
              nom={medico.nombre}
              ape={medico.apellido}
              tipmedico={medico.tipoDeMedico}
              ide={medico._id}
              
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default PanelSecretario;
