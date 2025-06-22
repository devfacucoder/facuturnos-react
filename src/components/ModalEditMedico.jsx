import React, { useState, useEffect, useContext } from "react";
import { mmedicoSelect, arrayMedicosCtx } from "../pages/PanelAdmin";
import useMedicos from "../hooks/useMedicos";
const especializaciones = [
  "Clínico general",
  "Pediatra",
  "Ginecólogo",
  "Dermatólogo",
  "Cardiólogo",
  "Neurólogo",
  "Traumatólogo",
  "Oftalmólogo",
  "Odontólogo",
  "Otorrinolaringólogo",
  "Endocrinólogo",
  "Reumatólogo",
  "Urólogo",
  "Gastroenterólogo",
  "Oncólogo",
  "Psiquiatra",
  "Psicólogo",
  "Alergólogo",
  "Hematólogo",
  "Nefrólogo",
  "Infectólogo",
  "Neumonólogo",
  "Nutricionista",
  "Fisiatra",
  "Cirujano general",
  "Cirujano plástico",
  "Médico del deporte",
];

function ModalEditMedico() {
  const [stateMedico, setStateMedico] = useContext(mmedicoSelect);
  const [error, setError] = useState(false);
  const [stateMessage, setStateMessage] = useState("");
  const [stateArrayCtxMedicos, setStateArrayCtxMedicos] =
    useContext(arrayMedicosCtx);
  const { editMedico } = useMedicos();
  const [changeMedico, setChangeMedico] = useState({
    nombre: "",
    apellido: "",
    tipoDeMedico: "",
  });

  const handleSendEdit = async (e) => {
    e.preventDefault();

    const bodyReq = {};
    changeMedico.nombre !== "" && changeMedico.nombre !== stateMedico.nombre
      ? (bodyReq.nombre = changeMedico.nombre)
      : null;

    changeMedico.apellido !== "" &&
    changeMedico.apellido !== stateMedico.apellido
      ? (bodyReq.apellido = changeMedico.apellido)
      : null;

    changeMedico.tipoDeMedico !== "" &&
    changeMedico.tipoDeMedico !== stateMedico.tipoDeMedico
      ? (bodyReq.tipoDeMedico = changeMedico.tipoDeMedico)
      : null;

    const response = await editMedico(stateMedico._id, bodyReq);
    if (response.statusCode === 200) {
      setError(false);
      setStateMessage(response.message);
      setStateArrayCtxMedicos((prevArray) =>
        prevArray.map((element) =>
          element._id === response.objMedico._id
            ? { ...element, ...response.objMedico }
            : element
        )
      );
    } else {
      setStateMessage(response.message);

      setError(true);
    }
  };

  useEffect(() => {
    
    setStateMessage("")
    setChangeMedico({
      nombre: stateMedico.nombre || "",
      apellido: stateMedico.apellido || "",
      tipoDeMedico: stateMedico.tipoDeMedico || "",
    });
  }, [stateMedico]);
  return (
    <div className="bg-blue-900 w-full h-96 sm:w-2xs py-4">
      <h2 className="text-white px-2 text-xl font-bold mb-4">Editar Medico</h2>

      <form
        className="flex flex-col gap-4 px-2 text-white"
        onSubmit={handleSendEdit}
      >
        {/* Nombre */}
        <div className="flex flex-col">
          <label
            htmlFor="nombre"
            className="text-sm font-semibold text-cyan-100 mb-1"
          >
            Nombre
          </label>
          <input
            value={changeMedico.nombre}
            id="nombre"
            type="text"
            className="bg-blue-950 border border-blue-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            onChange={(e) => {
              setChangeMedico((prev) => ({ ...prev, nombre: e.target.value }));
            }}
          />
        </div>

        {/* Apellido */}
        <div className="flex flex-col">
          <label
            htmlFor="apellido"
            className="text-sm font-semibold text-cyan-100 mb-1"
          >
            Apellido
          </label>
          <input
            value={changeMedico.apellido}
            id="apellido"
            type="text"
            className="bg-blue-950 border border-blue-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            onChange={(e) => {
              setChangeMedico((prev) => ({
                ...prev,
                apellido: e.target.value,
              }));
            }}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="clave"
            className="text-sm font-semibold text-cyan-100 mb-1"
          >
            Contraseña
          </label>
          <select
            value={changeMedico.tipoDeMedico}
            name=""
            id=""
            className="text-sm font-semibold p-2 custom-scrollbar bg-blue-950 text-cyan-100 "
            onChange={(e) => {
              setChangeMedico((prev) => ({
                ...prev,
                tipoDeMedico: e.target.value,
              }));
            }}
          >
            <option
              value={
                stateMedico.tipoDeMedico ? stateMedico.tipoDeMedico : undefined
              }
            >
              {stateMedico.tipoDeMedico ? stateMedico.tipoDeMedico : undefined}
            </option>
            {especializaciones.map((e, index) => (
              <option value={e}>{e}</option>
            ))}
          </select>
        </div>
        {stateMessage !== "" ? (
          <p className={`${error?"text-red-400":"text-green-400"}`}>{stateMessage}</p>
        ) : null}

        {/* Botón */}
        <div className="flex justify-end ">
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded text-white font-semibold transition"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalEditMedico;
