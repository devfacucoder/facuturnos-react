import React,{useState} from "react";

function Button({ TextContent, disable = false,segondStyle=false,event  }) {
  return (
    <button
      onClick={()=>{
        event(false)
      }}
      className={`w-full flex p-2 mt-1 rounded cursor-pointer justify-center hover:bg-blue-700  ${
        disable ? "opacity-50" : null
      }  text-white text-2xl ${segondStyle?"bg-none outline-1 outline-white":"bg-blue-800 "} `}
    >
      {TextContent}
    </button>
  );
}

function ModalEditMedico({
  onClose,
  medicoStads = {
    nombre: "nombre del Médico",
    apellido: "Apellido del Médico",
    codAcess: "",
    tipoDeMedico: "",
    role: "",
    createdAt: new Date().toISOString(),
  },
}) {
  const [editable,setEditable] = useState(true)
  return (
    <React.Fragment>
      <div className="flex flex-col bg-blue-950 text-cyan-200 w-full h-full  rounded-lg shadow-lg fixed sm:static z-50 top-5 left-0 bottom-5 right-0 m-auto p-4 gap-4 border border-blue-700">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-blue-700 pb-2">
          <h3 className="text-lg font-bold text-white">Editar Médico</h3>
        </div>
        {/* Contenido */}
        <div className="flex flex-col gap-3 ">
          <InputField Editable={editable} label="Nombre" value={medicoStads.nombre} />
          <InputField Editable={editable} label="Apellido" value={medicoStads.apellido} />
          <InputField Editable={editable} label="Código de acceso" value={medicoStads.codAcess} />
          <InputField Editable={editable} label="Especialidad" value={medicoStads.tipoDeMedico} />

          <InputField
            label="Fecha de creación"
            value={new Date(medicoStads.createdAt).toLocaleString()}
          />
        </div>
        <div className="w-full flex justify-center items-center gap-4  ">
          <div className="w-1/2">
            <Button TextContent={"Editar"} event={setEditable}/>
          </div>
         <div className="w-1/2">
            <Button TextContent={"Borrar"}  segondStyle={true} />
          </div>
         
        </div>
      </div>
    </React.Fragment>
  );
}

function InputField({ label, value,Editable }) {
  return (
    <div>
      <label className="text-sm font-semibold text-cyan-100">{label}</label>
      <input
        type="text"
        defaultValue={value}
        readOnly={Editable}
        className="w-full p-2 mt-1 rounded bg-blue-800 border border-blue-600 text-white"
      />
    </div>
  );
}

export default ModalEditMedico;
