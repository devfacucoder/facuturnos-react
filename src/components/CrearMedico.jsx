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

function CrearMedico({ set }) {
  const [err, setErr] = useState({ active: false, message: "" });
  const [bodyReq, setBodyReq] = useState({
    nombreMedico: "",
    apellidoMedico: "",
    password: "",
    tipoDeMedico: "",
  });

  const handleCrearMedico = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(apiUrl + "/api/medico/agregarmedico", {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyReq),
      });

      const data = await res.json();

      if (!res.ok) {
        // Mostrar mensaje de error si la API responde con error
        throw new Error(data?.message || "Error al crear médico");
      }

      if (data.objMedico) {
        set(data.objMedico);
        setErr({ active: false, message: "" }); // limpiar error si todo salió bien
      }
    } catch (error) {
      setErr({ active: true, message: error.message });
    }
  };

  return (
    <div className="bg-blue-900 text-white p-6 rounded-lg shadow-lg w-full ">
      <h3 className="text-xl font-bold mb-4 text-center">
        Registrar Nuevo Médico
      </h3>

      {err.active && (
        <div className="bg-red-600 text-white p-2 rounded mb-4">
          {err.message}
        </div>
      )}

      <form className="flex flex-col gap-4" onSubmit={handleCrearMedico}>
        <div className="flex flex-col">
          <label htmlFor="nombre" className="mb-1 font-semibold">Nombre</label>
          <input
          required
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
          <label htmlFor="apellido" className="mb-1 font-semibold">Apellido</label>
          <input
          required
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
          <label htmlFor="especialidad" className="mb-1 font-semibold">Especialidad</label>
          <select
          required
            id="especialidad"
            className="p-2 rounded bg-blue-800 text-white border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {
              setBodyReq((prev) => ({ ...prev, tipoDeMedico: e.target.value }));
            }}
          >
            <option value="">Seleccionar especialidad</option>
            {especializaciones.map((e, index) => (
              <option key={index} value={e}>{e}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-semibold">Contraseña</label>
          <input
          required
            id="password"
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
