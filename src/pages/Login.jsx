import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();
  const [logSend, setLogSend] = useState({ cod: "", password: "" });
  const [errLog, setErrLog] = useState(null);
  const [loading, setLoading] = useState(false);

  const logearse = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrLog(null);

    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(logSend),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        setErrLog("Código o contraseña incorrectos.");
        return;
      }

      // Guardar token y redirigir
      localStorage.setItem("token", data.token);
     localStorage.setItem("loginTime", new Date().toISOString());
// o
localStorage.setItem("loginTimestamp", Date.now().toString());
      navigate("/paneladmin");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrLog("Error del servidor. Intente más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-950 px-4">
      <form
        onSubmit={logearse}
        className="bg-blue-800 p-6 rounded-lg shadow-md w-full max-w-md flex flex-col gap-5 text-white"
      >
        <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>

        <div className="flex flex-col">
          <label htmlFor="inpCod" className="text-sm mb-1">Código</label>
          <input
            type="text"
            id="inpCod"
            className="p-2 rounded bg-white text-black"
            placeholder="Ingrese su código"
            required
            value={logSend.cod}
            onChange={(e) =>
              setLogSend((prev) => ({ ...prev, cod: e.target.value }))
            }
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="inpPass" className="text-sm mb-1">Contraseña</label>
          <input
            type="password"
            id="inpPass"
            className="p-2 rounded bg-white text-black"
            placeholder="Ingrese su contraseña"
            required
            value={logSend.password}
            onChange={(e) =>
              setLogSend((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>

        {errLog && (
          <p className="text-red-300 text-center text-sm">{errLog}</p>
        )}

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded transition"
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

export default Login;
