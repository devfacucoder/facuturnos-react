const apiUrl = import.meta.env.VITE_API_URL;

const useMedicos = () => {
  const editMedico = async (idMedico, bodyReq) => {
    try {
      const token = localStorage.getItem("token");

      if (!token)
        throw new Error("Token no encontrado. Usuario no autenticado.");

      const response = await fetch(`${apiUrl}/api/medico/${idMedico}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyReq),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          message: data.message || "Médico actualizado correctamente",
          objMedico: data.objMedico,
          statusCode: response.status,
        };
      } else {
        // Podés manejar errores personalizados del backend acá
        return {
          message: data.message || "Error al actualizar el médico",
          statusCode: response.status,
          error: true,
        };
      }
    } catch (error) {
      console.error("Error en editMedico:", error);
      return {
        message: "Error de red o interno del servidor",
        statusCode: 500,
        error: true,
      };
    }
  };
  const getListaMedicos = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/medico/listamedicos`);

      if (!res.ok) {
        throw new Error(`Error del servidor: ${res.status}`);
      }

      const data = await res.json();

      // validamos que venga el array
      if (!Array.isArray(data.listamedicos)) {
        throw new Error("Formato de respuesta inválido");
      }

      return data;
    } catch (error) {
      console.error("Error en getListaMedicos:", error);
      throw error; // re-lanzamos para que el componente lo maneje
    }
  };
  const getMedico = async (idMedico) => {
    try {
      const res = await fetch(`${apiUrl}/api/medico/${idMedico}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error al obtener médicos:", err);
      return []; // Retornar array vacío en caso de error
    }
  };
  const getListaTurnos = async (idMedico) => {
    try {
      const res = await fetch(apiUrl + "/api/medico/listaturnos/" + idMedico);
      if (!res.ok) {
        throw new Error(`Error del servidor: ${res.status}`);
      }
      const data = await res.json();

      return data;
    } catch (error) {
      console.error("error al obtener la lista de turnos: " + error);
      return [];
    }
  };
  return { getListaMedicos, getMedico, getListaTurnos, editMedico };
};

export default useMedicos;
