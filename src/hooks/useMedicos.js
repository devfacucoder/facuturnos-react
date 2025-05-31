const apiUrl = import.meta.env.VITE_API_URL;

const useMedicos = () => {
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
  return { getListaMedicos, getMedico, getListaTurnos };
};

export default useMedicos;
