import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import useMedicos from "../hooks/useMedicos";
import InputDate from "../components/InputDate";
import SelectorTurnos from "../components/SelectorTurnos";
import useTurnos from "../hooks/useTurnos";
function PedirTurno() {
  const location = useLocation();
  const { idMedico } = useParams();
  const [datosMedico, setDatosMedico] = useState(null);
  const medico = location.state?.medico;
  const { getMedico } = useMedicos();

  const {reservar} = useTurnos()

  const [sendTurno, setSendTurno] = useState({
    fecha: "",
    hora: "",
    nombrePaciente: "",
    apellidoPaciente: "",
    telPaciente: "",
    medico: idMedico,
  });

  const handlePedirTurno = async (e)=>{
    e.preventDefault();

    const respone = await reservar(sendTurno);
    console.log(respone)
  }

  useEffect(() => {
    // Si no viene el médico por props, lo pedimos por fetch
    if (!medico) {
      const obtenerMedico = async () => {
        try {
          const dataMedico = await getMedico(idMedico);
          setDatosMedico(dataMedico.objMedico);
        } catch (error) {
          console.error("Error al obtener médico:", error);
        }
      };
      obtenerMedico();
    }
  }, []);

  const medicoAMostrar = medico || datosMedico;

  return (
    <div className="w-full">
      {medicoAMostrar ? (
        <div className="w.full">
          <div className="w-full  bg-blue-500 px-0 flex flex-col items-center  justify-center">
            <h3 className="text-2xl text-white">
              Dr{" "}
              {medicoAMostrar.nombre +
                " " +
                medicoAMostrar.apellido +
                " - " +
                medicoAMostrar.tipoDeMedico}
            </h3>
            <h4 className="text-2xl text-white font-medium">
              Elegir Horario Disponible{" "}
            </h4>
            <div>
              <InputDate
                setDate={(fecha) =>
                  setSendTurno((prev) => ({ ...prev, fecha }))
                }
              />
            </div>
            <SelectorTurnos
              setStateHora={(hora) =>
                setSendTurno((prev) => ({ ...prev, hora }))
              }
            />
          </div>
          <div className="w-full flex justify-center">
            <form className="w-4/5 flex flex-col gap-2" onSubmit={handlePedirTurno}>
              <h3>Ingrese sus datos</h3>
              <div className="flex flex-col">
                <label htmlFor="">Nombre</label>
                <input
                  placeholder="Ingrese su Nombre"
                  className="w-full h-10 placeholder:text-2xl px-2 text-2xl bg-gray-200 border-1 border-black"
                  type="text"
                  onChange={(e) => {
                    setSendTurno((prev) => ({
                      ...prev,
                      nombrePaciente: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-col justify-center">
                <label htmlFor="" className="text-sm">
                  Apellido
                </label>
                <input
                  required
                  placeholder="Ingrese su Apellido"
                  className="w-full h-10 placeholder:text-2xl px-2 text-2xl bg-gray-200 border-1 border-black"
                  type="text"
                  onChange={(e) => {
                    setSendTurno((prev) => ({
                      ...prev,
                      apellidoPaciente: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Numero de Telefono</label>
                <input
                  placeholder="Ingrese su celular"
                  className="w-full h-10 placeholder:text-2xl px-2 text-2xl bg-gray-200 border-1 border-black"
                  type="number"
                  onChange={(e) => {
                    setSendTurno((prev) => ({
                      ...prev,
                      telPaciente: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-col">
                <button className="bg-blue-600 text-white text-2xl ">
                  Pedir Turno
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">Cargando médico...</p>
      )}
    </div>
  );
}

export default PedirTurno;
