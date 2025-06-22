import React, { useState, useEffect, createContext } from "react";
import useMedicos from "../hooks/useMedicos";
import TablaMedicos from "../components/TablaMedicos";
import ModalEditMedico from "../components/ModalEditMedico";
export const mmedicoSelect = createContext();
export const arrayMedicosCtx = createContext();
export const handleModalTurnos = createContext();

import ModalTurnos from "../components/Modalturnos";
function PanelAdmin() {
  const [stateMedico, setStateMedico] = useState({});
  const [stateArrayCtx, setStateArrayCtx] = useState([]);
  const [viewModalTurno, setViewModalTurno] = useState(false);
  return (
    <handleModalTurnos.Provider value={[viewModalTurno, setViewModalTurno]}>
      <arrayMedicosCtx.Provider value={[stateArrayCtx, setStateArrayCtx]}>
        <mmedicoSelect.Provider value={[stateMedico, setStateMedico]}>
          <div className="w-full min-h-screen bg-blue-950">
            <div className="   w-full  flex flex-col gap-2 px-4 sm:flex-row sm:justify-center justify-start items-center  text-white py-6">
              <TablaMedicos pSetTurnos={setViewModalTurno} />
              <ModalEditMedico setTurnos={setViewModalTurno} />
            </div>
            <div className="px-4">
              {viewModalTurno ? <ModalTurnos /> : null}
            </div>
          </div>
        </mmedicoSelect.Provider>
      </arrayMedicosCtx.Provider>
    </handleModalTurnos.Provider>
  );
}
/** 

         */
export default PanelAdmin;
