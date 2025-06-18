import React, { useState } from "react";
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
function Button({
  TextContent,
  disable = false,
  type = "button",
  segondStyle = false,
  event,
}) {
  return (
    <button
      type={type}
      onClick={() => {
        event();
      }}
      className={`w-full flex p-2 mt-1 rounded cursor-pointer justify-center hover:bg-blue-700  ${
        disable ? "opacity-50" : null
      }  text-white text-2xl ${
        segondStyle ? "bg-none outline-1 outline-white" : "bg-blue-800 "
      } `}
    >
      {TextContent}
    </button>
  );
}

function ModalEditMedico({
  onClose,
  medicoStads = {
    nombre: "",
    apellido: "",
    codAcess: "",
    tipoDeMedico: "",
    role: "",
    _id: "",
    createdAt: new Date().toISOString(),
  },
}) {
  const [editable, setEditable] = useState(true);
  const [statemMnssage, setStatemMnssage] = useState({
    menssage: "",
    error: false,
    statusCod:undefined
  });
  const [bodyReq, setBodyReq] = useState(); // inicializar con valores
  const { editMedico } = useMedicos(); // Asegúrate de que este hook exporte esa función

  const handleEditMedico = async () => {
    try {
      const request = {};

      if (!bodyReq) return;

      if (bodyReq.nombre && bodyReq.nombre !== medicoStads.nombre) {
        request.nombre = bodyReq.nombre;
      }
      if (bodyReq.apellido && bodyReq.apellido !== medicoStads.apellido) {
        request.apellido = bodyReq.apellido;
      }
      if (
        bodyReq.tipoDeMedico &&
        bodyReq.tipoDeMedico !== medicoStads.tipoDeMedico
      ) {
        request.tipoDeMedico = bodyReq.tipoDeMedico;
      }

      if (Object.keys(request).length === 0) return; // nada que actualizar

      const response = await editMedico(medicoStads._id, request);
      if (response.statusCod === 200) {
        setStatemMnssage((prev) => ({
          ...prev,
          error: false,
          menssage: response.message,
          statusCod:response.statusCode

        }));
      } else {
        setStatemMnssage((prev) => ({
          ...prev,
          error: true,
          menssage: response.message,
          statusCod:response.statusCode
        }));
      }
      console.log("Editado:", response);
    } catch (error) {
      console.error("Error editando médico", error);
    }
  };
  return (
    <div className="flex flex-col bg-blue-950 text-cyan-200 w-full h-full rounded-lg shadow-lg fixed sm:static z-50 top-5 left-0 bottom-5 right-0 m-auto p-4 gap-4 border border-blue-700">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-blue-700 pb-2">
        <h3 className="text-lg font-bold text-white">Editar Médico</h3>
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-3 ">
        <InputField
          label="Nombre"
          name="nombre"
          value={medicoStads.nombre}
          Editable={editable}
          set={setBodyReq}
        />
        <InputField
          label="Apellido"
          name="apellido"
          value={medicoStads.apellido}
          Editable={editable}
          set={setBodyReq}
        />
        <InputField
          label="Código de acceso"
          name="codAcess"
          value={medicoStads.codAcess}
          Editable={editable}
          set={setBodyReq}
        />
        <InputEspecialidades
          defaultValue={medicoStads.tipoDeMedico}
          set={setBodyReq}
          Editable={editable}
        />
      </div>
      <p className={`${statemMnssage.error?"text-red-600":"text-green-500"}`}>
        {
           statemMnssage.menssage
        }
      </p>
      {/* Botones */}
      <div className="w-full flex justify-center items-center gap-4  ">
        <div className="w-1/2">
          <Button
            TextContent={editable ? "Editar" : "Guardar"}
            type="button"
            event={async () => {
              if (editable) {
                setEditable(false); // Habilita edición
              } else {
                await handleEditMedico(); // Guarda
                setEditable(true); // Deshabilita edición
              }
            }}
          />
        </div>
        <div className="w-1/2">
          <Button TextContent={"Cancelar"} segondStyle={true} event={onClose} />
        </div>
      </div>
    </div>
  );
}

function InputField({ label, name, value, Editable, set }) {
  return (
    <div>
      <label className="text-sm font-semibold text-cyan-100">{label}</label>
      <input
        onChange={(e) => set((prev) => ({ ...prev, [name]: e.target.value }))}
        type="text"
        defaultValue={value}
        disabled={Editable}
        className="w-full p-2 mt-1 rounded bg-blue-800 border border-blue-600 text-white"
      />
    </div>
  );
}
function InputEspecialidades({ defaultValue, set, Editable }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-cyan-100">
        Especialidad
      </label>
      <select
        disabled={Editable}
        className="w-full p-2 mt-1 rounded bg-blue-800 border border-blue-600 text-white"
        defaultValue={defaultValue}
        onChange={(e) =>
          set((prev) => ({ ...prev, tipoDeMedico: e.target.value }))
        }
      >
        <option disabled value="">
          Selecciona una especialidad
        </option>
        {especializaciones.map((e, index) => (
          <option key={index} value={e}>
            {e}
          </option>
        ))}
      </select>
    </div>
  );
}
export default ModalEditMedico;
