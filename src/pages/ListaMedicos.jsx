import React, { useState, useEffect } from "react";
import useMedicos from "../hooks/useMedicos";
import { Link } from "react-router-dom";
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
    <div className="flex flex-col w-full items-center min-h-screen bg-blue-950">
      <div className="w-full   h-32">
        <img
          className="object-cover w-full h-full"
          src="/imagenes/portada-inicio.jpeg"
          alt="Portada"
        />
      </div>
      <ul className="w-full flex flex-col  md:w-1/2 gap-2 px-2 py-2">
        {medicos.map((medico, index) => (
          <li className="w-full h-10  bg-blue-800 text-white rounded-xl shadow-md hover:shadow-cyan-500/20 hover:scale-[1.01] transition transform duration-200">
            <Link
              className="flex items-center justify-start px-2 gap-2"
              to={`/pedir/${medico._id}`}
              state={{ medico }}
            >
              <p className="text-xl font-semibold">{medico.nombre + " " + medico.apellido}</p>
              <strong className="text-sm text-cyan-200">{medico.tipoDeMedico}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
// <Link >

export default ListaMedicos;
