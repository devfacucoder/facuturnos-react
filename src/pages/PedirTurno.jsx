import React, { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
import { useParams } from "react-router-dom";

function PedirTurno() {
  const { id } = useParams();
  const [fecha, setFecha] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [horariosOcupados, setHorariosOcupados] = useState([]);
  const [todosLosTurnos, setTodosLosTurnos] = useState([]);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [tel, setTel] = useState("");

  const generarHorarios = () => {
    const horarios = [];
    let hora = 8;
    let minuto = 0;

    while (hora < 16 || (hora === 16 && minuto === 0)) {
      const h = String(hora).padStart(2, "0");
      const m = String(minuto).padStart(2, "0");
      horarios.push(`${h}:${m}`);
      minuto += 30;
      if (minuto >= 60) {
        minuto = 0;
        hora++;
      }
    }

    return horarios;
  };

  const horarios = generarHorarios();

  const sendTurno = (e) => {
    e.preventDefault();
    fetch(apiUrl + "/api/turnos/reservar", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nombrePaciente: nombre,
        apellidoPaciente: apellido,
        telPaciente: tel,
        medico: id,
        fecha,
        hora: horarioSelecionado,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.objTurno) {
          console.log(data.objTurno);
          localStorage.setItem("turno", JSON.stringify(data.objTurno));
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Trae todos los turnos del médico una sola vez
    fetch(apiUrl + "/api/medico/listaturnos/" + id)
      .then((res) => res.json())
      .then((data) => {
        if (data.objLista) {
          setTodosLosTurnos(data.objLista);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    // Filtra los turnos ocupados por la fecha seleccionada
    if (fecha && todosLosTurnos.length > 0) {
      const ocupadosEnFecha = todosLosTurnos
        .filter((turno) => turno.fecha === fecha)
        .map((turno) => turno.hora);
      setHorariosOcupados(ocupadosEnFecha);
    } else {
      setHorariosOcupados([]);
    }
  }, [fecha, todosLosTurnos]);

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      <div className="bg-blue-500 p-4 text-white rounded">
        <h2 className="text-lg font-bold mb-2">
          Turnos Disponibles del Dr. Jonny Pariston
        </h2>
        <div className="mb-4">
          <label htmlFor="fecha">Selecciona una fecha: </label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="text-black px-2 py-1 rounded"
          />
        </div>

        {fecha ? (
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {horarios
              .filter((hora) => !horariosOcupados.includes(hora))
              .map((hora, index) => (
                <li key={index}>
                  <button
                    onClick={() => setHorarioSelecionado(hora)}
                    className={`w-full text-black text-left p-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
                      horarioSelecionado === hora
                        ? "bg-blue-200 font-semibold"
                        : "bg-white"
                    }`}
                  >
                    {hora}
                  </button>
                </li>
              ))}
            {horarios.filter((hora) => !horariosOcupados.includes(hora)).length === 0 && (
              <p className="col-span-full text-yellow-100">
                No hay horarios disponibles para esta fecha.
              </p>
            )}
          </ul>
        ) : (
          <p className="text-yellow-100">Selecciona una fecha para ver los horarios disponibles.</p>
        )}

        {horarioSelecionado && (
          <p className="text-green-200 font-medium mt-3">
            Has seleccionado el horario: {horarioSelecionado}
          </p>
        )}
      </div>

      <div className="bg-gray-100 p-4 rounded shadow">
        <h3 className="text-md font-semibold mb-2">Formulario para pedir turno</h3>
        <form onSubmit={sendTurno} className="flex flex-col w-full gap-4">
          <div className="flex flex-col w-full text-2xl">
            <label>Nombre</label>
            <input
              onChange={(e) => setNombre(e.target.value)}
              type="text"
              placeholder="Ingrese su Nombre"
              className="w-full border border-black px-2"
            />
          </div>
          <div className="flex flex-col w-full text-2xl">
            <label>Apellido</label>
            <input
              onChange={(e) => setApellido(e.target.value)}
              type="text"
              placeholder="Ingrese su Apellido"
              className="w-full border border-black px-2"
            />
          </div>
          <div className="flex flex-col w-full text-2xl">
            <label>Documento</label>
            <input
              onChange={(e) => setDni(e.target.value)}
              type="number"
              placeholder="Ingrese su DNI"
              className="w-full border border-black px-2"
            />
          </div>
          <div className="flex flex-col w-full text-2xl">
            <label>Teléfono</label>
            <input
              onChange={(e) => setTel(e.target.value)}
              type="number"
              placeholder="Ingrese un número de teléfono"
              className="w-full border border-black px-2"
            />
          </div>
          <div className="flex flex-col w-full text-2xl h-20 ">
            <button className="bg-blue-600 text-white font-sans font-medium flex items-center justify-center">
              Pedir Turno
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PedirTurno;
