import React, { useState, useEffect } from "react";
import useMedicos from "../hooks/useMedicos";
import {Link} from "react-router-dom"
function ListaMedicos() {
  const [medicos, setMedicos] = useState([]);
  const { getListaMedicos } = useMedicos();

  useEffect(() => {
    const fetchMedicos = async () => {
      const data = await getListaMedicos();
      setMedicos(data.listamedicos);
    };
    fetchMedicos();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="w-full h-32">
        <img
          className="object-cover w-full h-full"
          src="/imagenes/portada-inicio.jpeg"
          alt="Portada"
        />
      </div>
      <div>
        {Array.isArray(medicos) && medicos.length > 0 ? (
          medicos.map((medico) => (
            <div
              key={medico._id}
              className="bg-white shadow-md rounded-lg p-4 m-4"
            >
              <Link to={`/pedir/${medico._id}`} state={{medico}}>
              <h2 className="text-xl font-bold">{medico.nombre}</h2>
              <p>{medico.tipoDeMedico}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No hay médicos disponibles.
          </p>
        )}
      </div>
    </div>
  );
}

export default ListaMedicos;
