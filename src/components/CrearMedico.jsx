import React, { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
const especializaciones = [
  "Clínico general",
  "Pediatra",
  "Ginecólogo",
  "Dermatólogo",
  "Cardiólogo",
  "Neurólogo",
  "Traumatólogo",
  "Oftalmólogo",
  "Odontólogo", // Dentista
  "Otorrinolaringólogo", // Oídos, nariz, garganta
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
function CrearMedico({ set }) {
  const [bodyReq, setBodyReq] = useState({
    nombreMedico: "",
    apellidoMedico: "",
    password: "",
    tipoDeMedico: "",
  });
  const handleCrearMedico = (e) => {
    e.preventDefault();
    fetch(apiUrl + "/api/medico/agregarmedico", {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(bodyReq),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.objMedico) {
          set(data.objMedico); // enviar el nuevo médico al estado padre
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-blue-900 text-white p-6 rounded-lg shadow-lg w-full sm:w-96 max-w-lg mb-8">
      <h3 className="text-xl font-bold mb-4 text-center">
        Registrar Nuevo Médico
      </h3>
      <form className="flex flex-col gap-4" onSubmit={handleCrearMedico}>
        <div className="flex flex-col">
          <label htmlFor="nombre" className="mb-1 font-semibold">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            className="p-2 rounded bg-blue-800 text-white border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ej: Juan"
            onChange={(e) => {
              setBodyReq((prev) => ({ ...prev, nombreMedico: e.target.value }));
            }}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="apellido" className="mb-1 font-semibold">
            Apellido
          </label>
          <input
            id="apellido"
            type="text"
            className="p-2 rounded bg-blue-800 text-white border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ej: Pérez"
            onChange={(e) => {
              setBodyReq((prev) => ({
                ...prev,
                apellidoMedico: e.target.value,
              }));
            }}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="especialidad" className="mb-1 font-semibold">
            Especialidad
          </label>
          <select
            id="especialidad"
            className="p-2 rounded bg-blue-800 text-white border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {
              setBodyReq((prev) => ({ ...prev, tipoDeMedico: e.target.value }));
            }}
          >
            <option value="">Seleccionar especialidad</option>
            {especializaciones.map((e, index) => (
              <option value={e}>{e}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="nombre" className="mb-1 font-semibold">
            Contraseña
          </label>
          <input
            id="nombre"
            type="password"
            className="p-2 rounded bg-blue-800 text-white border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ej: Juan123"
            onChange={(e) => {
              setBodyReq((prev) => ({ ...prev, password: e.target.value }));
            }}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 font-semibold py-2 px-4 rounded mt-2"
        >
          Crear Médico
        </button>
      </form>
    </div>
  );
}

export default CrearMedico;
