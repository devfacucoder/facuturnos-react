import React, { useEffect, useState } from "react";
import InputDate from "./InputDate";
import useTurnos from "../hooks/useTurnos";
const horarios = [
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
];
function ModalEdit({
  onClose,
  pNombrePaciente,
  pApellidoPaciente,
  pHora,
  pFecha,
  pTelPaciente,
  pIde,
  pCreatedAt,
}) {
  const [modeEdit, setModoEdit] = useState(false);
  const [bodyEdit, setBodyEdit] = useState({});
  const { editTurno } = useTurnos();
  const [turnoEdited, setTurnoEdited] = useState("");
  const handleEditTurno = async () => {
    const response = await editTurno(pIde, bodyEdit);
    if (response.status === 200) {
      setTurnoEdited(response.message);
    }
  };

  useEffect(() => {
    // Guardar la posición actual del scroll
    const scrollY = window.scrollY;

    // Bloquear scroll y subir al tope
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      // Restaurar scroll y habilitar nuevamente
      document.body.style.overflow = "auto";
      window.scrollTo({ top: scrollY });
    };
  }, []);
  return (
    <>
      <div className="bg-black opacity-75 left-0 bottom-0 fixed z-40 w-screen h-screen"></div>
      <div className="bg-white absolute top-0 left-0 right-0 bottom-0 z-60 m-auto  h-72 w-5/6 sm:w-96 rounded-2xl">
        <div className="flex justify-between items-center px-2 py-2">
          <p className="w-2/3  text-center">Editar Turno</p>
          <button
            className="w-8 h-8 active:bg-gray-500 rounded-full cursor-pointer "
            onClick={() => {
              onClose(false);
            }}
          >
            X
          </button>
        </div>
        <hr />
        <div className="w-full">
          <ul className="w-full flex flex-col items-start px-2">
            <li className="flex gap-2">
              <strong>Nombre:</strong>
              <input
                type="text"
                defaultValue={pNombrePaciente}
                disabled={!modeEdit}
                onChange={(e) => {
                  setBodyEdit((prev) => ({
                    ...prev,
                    nombrePaciente: e.target.value,
                  }));
                }}
              />
            </li>
            <li className="flex gap-2">
              <strong>Apellido:</strong>
              <input
                type="text"
                defaultValue={pApellidoPaciente}
                disabled={!modeEdit}
                onChange={(e) => {
                  setBodyEdit((prev) => ({
                    ...prev,
                    apellidoPaciente: e.target.value,
                  }));
                }}
              />
            </li>
            <li className="flex gap-2">
              <strong>Telefono:</strong>
              <input
                type="number"
                defaultValue={pTelPaciente}
                disabled={!modeEdit}
                onChange={(e) => {
                  setBodyEdit((prev) => ({
                    ...prev,
                    telPaciente: e.target.value,
                  }));
                }}
              />
            </li>
            <li className="flex gap-2">
              <strong>Fecha:</strong>
              <p>{pFecha}</p>
              {modeEdit ? (
                <input
                  type="date"
                  name=""
                  id=""
                  onChange={(e) => {
                    setBodyEdit((prev) => ({
                      ...prev,
                      fecha: e.target.value,
                    }));
                  }}
                />
              ) : null}
            </li>
            <li className="flex gap-2">
              <strong>Hora:</strong>
              <p>{pHora}</p>
              {modeEdit ? (
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setBodyEdit((prev) => ({
                      ...prev,
                      hora: e.target.value,
                    }));
                  }}
                >
                  {horarios.map((e, index) => (
                    <option value={e}>{e}</option>
                  ))}
                </select>
              ) : null}
            </li>
            <li className="flex gap-2">
              <strong>Fecha de reservacion:</strong>
            </li>
          </ul>
        </div>
        <hr />
        <div className="px-2 py-2 flex flex-col gap-2  ">
          <div className="flex w-full gap-2 ">
            <button
              className="bg-blue-600 px-2 w-1/2 text-white cursor-pointer "
              onClick={() => {
                setModoEdit(!modeEdit);
              }}
            >
              {modeEdit ? "Cancelar" : "Editar"}
            </button>
            <button className="bg-red-600 px-2 w-1/2 text-white cursor-pointer">
              Cancelar Turno
            </button>
          </div>
          {modeEdit ? (
            <button
              className="bg-green-600 px-2 w-full text-white cursor-pointer"
              onClick={() => {
                handleEditTurno();
              }}
            >
              {turnoEdited !== "" ? turnoEdited : "Aplicar Cambios"}
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default ModalEdit;
