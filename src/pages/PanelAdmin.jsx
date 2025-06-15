import React, { useState, useEffect, createContext } from "react";
import useMedicos from "../hooks/useMedicos";
import ModalEdit from "../components/ModalEdit";

import CrearMedico from "../components/CrearMedico";
import ModalEditMedico from "../components/ModalEditMedico";
import TablaMedicos from "../components/TablaMedicos";
export const MedicoContextSelected = createContext();
function PanelAdmin() {
  const [medicos, setMedicos] = useState([]);
  const [turnosVisibles, setTurnosVisibles] = useState({});
  const { getListaMedicos, getListaTurnos } = useMedicos();
  const [vieModalEdit, setViewModalEdit] = useState(false);
  const [vieModalCrearMedico, setVieModalCrearMedico] = useState(false);
  const [medicoSelect, setMedicoSelect] = useState({});

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
    <MedicoContextSelected.Provider value={[medicoSelect, setMedicoSelect]}>
      <div className="w-full min-h-screen bg-blue-950">
        <div className="flex flex-col md:flex-row p-4 gap-2">
          <div className=" w-full md:w-7/10 h-96">
            <TablaMedicos
              pMedicos={medicos}
              pSetSelectMedico={setMedicoSelect}
            />
          </div>
          <div className=" w-full md:w-3/10 max-w-2xl min-h-96 ">
            <ModalEditMedico medicoStads={medicoSelect} />
          </div>
        </div>
      </div>
    </MedicoContextSelected.Provider>
  );
}
/** 

         */
export default PanelAdmin;
