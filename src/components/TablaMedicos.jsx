import React, { useState,useContext, useEffect } from "react";
import {MedicoContextSelected} from "../pages/PanelAdmin"
function ItemTablaMedico({
  nombre,
  apellido,
  especialidad,
  pSelected,
  pSetSelected,
  pIndice
}) {
  return (
    <tr
      onClick={() => {
        pSetSelected(pIndice);
      }}
      className={`border-b  ${
        pSelected ? "bg-blue-900/40" : null
      }  border-gray-700 cursor-pointer hover:bg-blue-900/40 transition`}
    >
      <td className="px-4 py-3 w-1/3 text-sm text-gray-200">{nombre}</td>
      <td className="px-4 py-3 w-1/3 text-sm text-gray-200">{apellido}</td>
      <td className="px-4 py-3 w-1/3 text-sm font-medium text-cyan-300">
        {especialidad}
      </td>
    </tr>
  );
}

export { ItemTablaMedico };

function TablaMedicos({ pMedicos = [], pSetSelectMedico }) {
  const [indice, setIndice] = useState(null);
    const [set,state] = useContext(MedicoContextSelected)

    useEffect(()=>{
        if(indice){
            const indiceSelect = pMedicos.find((e,index)=> indice === index )
            console.log(indiceSelect)
            state(indiceSelect)
        }
    },[indice])
  return (
    <div className="overflow-x-auto rounded-xl shadow-xl h-full bg-blue-950 border border-blue-800 p-4 custom-scrollbar">
      <h2 className="text-xl font-bold text-cyan-200 mb-4">Lista de Médicos</h2>
      <table className="min-w-full text-left">
        <thead className="bg-blue-800 text-cyan-100">
          <tr>
            <th className="px-4 py-3 w-1/3 text-sm font-semibold">Nombre</th>
            <th className="px-4 py-3 w-1/3 text-sm font-semibold">Apellido</th>
            <th className="px-4 py-3 w-1/3 text-sm font-semibold">
              Especialidad
            </th>
          </tr>
        </thead>
        <tbody>
          {pMedicos.map((medico, index) => (
            <ItemTablaMedico
              key={index}
              pIndice={index}
              pSelected={indice === index ? true : false}
              pSetSelected={setIndice}
              nombre={medico.nombre}
              apellido={medico.apellido}
              especialidad={medico.tipoDeMedico}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaMedicos;
