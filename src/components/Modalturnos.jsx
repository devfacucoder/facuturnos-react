import React, { useEffect, useState, useContext } from "react";
import useTurnos from "../hooks/useTurnos";
import useMedicos from "../hooks/useMedicos";
import {
  mmedicoSelect,
  arrayMedicosCtx,
  handleModalTurnos,
} from "../pages/PanelAdmin";

function ItemTablaTurno({ pTurno }) {
  return (
    <tr className="h-10 text-start">
      <td className="px-2">{pTurno.nombrePaciente}</td>
      <td>{pTurno.medico}</td>
      <td>{pTurno.fecha}</td>
      <td>{pTurno.hora}</td>
      <td></td>
    </tr>
  );
}

function ModalTurnos() {
  const { getListaTurnos } = useMedicos();
  const [dataTurno, setDataTurno] = useState([]);
  const [error, setError] = useState(null);
  const [medicoSelect] = useContext(mmedicoSelect);
  const [val, setViewTurno] = useContext(handleModalTurnos);
  useEffect(() => {
    const sendListaTurnos = async () => {
      const response = await getListaTurnos("684b740d073f485edead342f");

      if (response.status === 200) {
        setDataTurno(response.data.objLista);
        setError(null);
      } else {
        setError(response.status);
        setDataTurno([]);
      }
    };
    sendListaTurnos();
  }, []);

  return (
    <>
      <div className="hidden md:block fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black opacity-30"></div>
      <div className="bg-blue-900 md:fixed md:z-50 md:top-0 md:left-0 md:bottom-0 md:right-0 md:m-auto w-full md:w-2xl h-96">
        <div className="w-full h-10 flex justify-between px-2">
          <h3 className="text-cyan-200 border-collapse text-2xl">{medicoSelect.nombre + " " + medicoSelect.apellido}</h3>
          <button
            className="text-2xl text-cyan-500 border-collapse"
            onClick={() => {
              setViewTurno(false);
            }}
          >
            X
          </button>
        </div>
        <table className="table-auto w-full text-white border-collapse">
          <thead>
            <tr className="border-b-1 px-2 h-10 text-start">
              <th className="w-1/5 text-start px-2">Paciente</th>
              <th className="w-1/5 text-start">Medico</th>
              <th className="w-1/5 text-start">Fecha</th>
              <th className="w-1/5 text-start">Hora</th>
              <th className="w-1/5 text-start">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dataTurno.length > 0 ? (
              dataTurno.map((turno) => (
                <ItemTablaTurno key={turno._id} pTurno={turno} />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  {error
                    ? "Error al cargar turnos."
                    : "No hay turnos disponibles."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ModalTurnos;
