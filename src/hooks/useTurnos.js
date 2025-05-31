import { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

function useTurnos() {
  const reservar = async (bodyReq) => {
    try {
      const response = await fetch(`${apiUrl}/api/turnos/reservar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyReq),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error al reservar turno:", err);
    }
  };
  const editTurno = async (idturno, bodyReq) => {
    const res = await fetch(`${apiUrl}/api/turnos/${idturno}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyReq),
    });
    const status = res.status
    if (!res.ok) {
      throw new Error(`Error del servidor: ${res.status}`);
    }

    const data = await res.json();

    // validamos que venga el array
    

    return {turnoNuevo:data,message:data.message,status};
  };
  const deleteTurno = (idturno) => {
    fetch(`${apiUrl}/api/turnos/${idturno}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  return { editTurno, deleteTurno, reservar };
}
export default useTurnos;
