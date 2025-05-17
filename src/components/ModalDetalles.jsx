import React, { useEffect, useState } from "react";

function ModalDetalles({ turno, onClose, listaTurnos }) {
  const [stateForEdit, setStateEdit] = useState({});

  const [editMode, setEditMode] = useState(false);
  const [ape, setApe] = useState("");
  const [nom, setNom] = useState("");
  const [newHora, setNewHora] = useState("");
  const [newFecha, setFecha] = useState("");
  const [newTel, setNewTel] = useState("");
  const horariosBase = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30",
];
const [horariosComunes, setHorariosComunes] = useState(horariosBase);
  

  const verificarReservas = (fechaSeleccionada) => {
    // Filtrar horarios comunes que no estén ocupados en la fecha seleccionada
    const horariosDisponibles = horariosComunes.filter((hora) => {
      // Verifica si existe un turno con esa hora y fecha
      const ocupado = listaTurnos.some(
        (t) => t.fecha === fechaSeleccionada && t.hora === hora
      );
      return !ocupado; // solo incluir si NO está ocupado
    });

    setHorariosComunes(horariosDisponibles);
  };
  const handleForEdit = () => {};
  useEffect(() => {
    //verificarReservas(turno.fecha); // Filtra los horarios
  }, [turno]);
  if (!turno) return null;

  return (
    <>
      {/* Fondo oscuro */}
      <div
        className="bg-black fixed inset-0 z-30 opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal principal */}
      <div className="bg-white w-80 rounded-lg shadow-lg p-4 fixed left-0 right-0 top-0 bottom-0 m-auto z-50 max-h-[70vh] overflow-auto">
        <h2 className="text-lg font-bold mb-2 text-blue-700">
          Detalles del Turno
        </h2>
        <ul className="text-sm text-gray-800 space-y-1">
          <li className="flex gap-2">
            <strong>Paciente:</strong> {turno.nombrePaciente}
            <p contentEditable={editMode}>{turno.apellidoPaciente}</p>
          </li>
          <li className="flex gap-2">
            <strong>Teléfono: </strong>
            <p contentEditable={editMode}>{turno.telPaciente}</p>
          </li>
          <li className="flex gap-2">
            <strong>Fecha:</strong>
            <p>{turno.fecha}</p>

            {editMode ? (
              <input
                type="date"
                onChange={(e) => {
                  setHorariosComunes(horariosBase);

                  const nuevaFecha = e.target.value;
                  setFecha(nuevaFecha);
                  verificarReservas(nuevaFecha); // <-- llama a la función al cambiar fecha
                }}
              />
            ) : null}
          </li>
          <li className="flex gap-2">
            <strong>Hora:</strong>
            <p contentEditable={editMode}>{turno.hora}</p>
            <select
              name=""
              id=""
              onChange={(e) => {
                setNewHora(e.target.value);
              }}
            >
              {horariosComunes.map((e) => (
                <option value={e}>{e}</option>
              ))}
            </select>
          </li>
          <li className="flex gap-2">
            <strong>Creado:</strong>
            <p>{new Date(turno.createdAt).toLocaleString()}</p>
          </li>
        </ul>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              setEditMode(!editMode);
            }}
            className="bg-blue-500 text-white py-2 rounded"
          >
            {editMode ? "X" : "Editar"}
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 rounded"
          >
            Eliminar
          </button>
          <button
            onClick={() => {
              onClose();
              setEditMode(false);
            }}
            className="col-span-2 bg-gray-300 text-black py-2 rounded"
          >
            Cerrar
          </button>
          {editMode ? (
            <button
              onClick={onClose}
              className="col-span-2 bg-green-500 text-black py-2 rounded"
            >
              Guardar
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default ModalDetalles;
